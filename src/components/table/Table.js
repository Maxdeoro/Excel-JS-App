import { ExcelComponent } from '../../core/ExcelComponent';
import { createTable } from './table.template';
import { resizeHandler } from './table.resize';
import { shouldResize } from './table.functions';
import { TableSelection } from './TableSelection';
import { isCell } from './table.functions';
import { $ } from '../../core/dom';
import { matrix } from './table.functions';
import { nextSelector } from './table.functions';
// import { range } from '../../core/utils';

export class Table extends ExcelComponent {
    static className = 'excel__table';

    constructor($root) {
        super($root, {
            listeners: ['mousedown', 'keydown'],
        });
    };

    toHTML() {
        return createTable(20);
    };

    prepare() {
        this.selection = new TableSelection();
    };

    init() {
        super.init();

        // this.selection = new TableSelection();
        const $cell = this.$root.find('[data-id="0:0"]');
        this.selection.select($cell);
    };

    onMousedown(event) {
        if (shouldResize(event)) {
            resizeHandler(this.$root, event);
        } else if (isCell(event)) {
            const $target = $(event.target); 
            if (event.shiftKey) {
                // group of cells select

                const $cells = matrix($target, this.selection.current)
                        .map((id) => this.$root.find(`[data-id='${id}']`));
                        this.selection.selectGroup($cells);

                // console.log($cells);
            } else {
                this.selection.select($target);
            }
        }
    };

    onKeydown(event) {
        const keys = ['Enter', 'Tab', 'ArrowLeft', 'ArrowRight', 
            'ArrowUp', 'ArrowDown'];
        const {key} = event;
        if (keys.includes(key) && !event.shiftKey) {
            event.preventDefault();
            const id = this.selection.current.id(true);
            // console.log(key);

            const $next = this.$root.find(nextSelector(key, id));
            this.selection.select($next);
        }
        
    };
};

// function nextSelector(key, {col, row}) {
    // const MIN_VALUE = 0;
    // switch (key) {
        // case 'Enter':
        // case 'ArrowDown': row++;
            // break;
        // case 'Tab':
        // case 'ArrowRight': col++;
            // break;
        // case 'ArrowLeft': col = col-1 < MIN_VALUE ? MIN_VALUE : col-1;
            // break;
        // case 'ArrowUp': row = row-1 < MIN_VALUE ? MIN_VALUE : row-1;
           // break;
    // }
   // return `[data-id='${row}:${col}']`;
// };

/* function range(start, end) {
    if (start > end) {
        [end, start] = [start, end];
    }
    return new Array(end - start + 1)
        .fill('')
        .map((_, index) => start + index);
}; */
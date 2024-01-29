import { ExcelComponent } from '../../core/ExcelComponent';
import { createTable } from './table.template';
import { resizeHandler } from './table.resize';
import { shouldResize } from './table.functions';
import { TableSelection } from './TableSelection';
import { isCell } from './table.functions';
import { $ } from '../../core/dom';
import { matrix } from './table.functions';
// import { range } from '../../core/utils';

export class Table extends ExcelComponent {
    static className = 'excel__table';

    constructor($root) {
        super($root, {
            listeners: ['mousedown'],
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
};

/* function range(start, end) {
    if (start > end) {
        [end, start] = [start, end];
    }
    return new Array(end - start + 1)
        .fill('')
        .map((_, index) => start + index);
}; */
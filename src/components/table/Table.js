import { ExcelComponent } from '../../core/ExcelComponent';
import { createTable } from './table.template';
import { resizeHandler } from './table.resize';
import { shouldResize } from './table.functions';
import { TableSelection } from './TableSelection';
import { isCell } from './table.functions';
import { $ } from '../../core/dom';

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
            this.selection.select($target);
            console.log(event.target);
        }
    };
};
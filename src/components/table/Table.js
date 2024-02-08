import { ExcelComponent } from '../../core/ExcelComponent';
import { createTable } from './table.template';
import { resizeHandler } from './table.resize';
import { shouldResize } from './table.functions';
import { TableSelection } from './TableSelection';
import { isCell } from './table.functions';
import { $ } from '../../core/dom';
import { matrix } from './table.functions';
import { nextSelector } from './table.functions';
import * as actions from '../../myRedux/actions';

export class Table extends ExcelComponent {
    static className = 'excel__table';

    constructor($root, options) {
        super($root, {
            name: 'Table',
            listeners: ['mousedown', 'keydown', 'input'],
            ...options
        });
    };

    toHTML() {
        return createTable(20, this.store.getState());
    };

    prepare() {
        this.selection = new TableSelection();
    };

    init() {
        super.init();

        this.selectCell(this.$root.find('[data-id="0:0"]'));

        this.$on('Formula: input', 
        (text) => {
            this.selection.current.text(text);
        });

        this.$on('Formula: done', () => {
            this.selection.current.focus();
        });
// test
        // this.$subscribe((state) => {
        //     console.log('Table state ', state);
        // });
    };

    selectCell($cell) {
        this.selection.select($cell);
        this.$emit('Table: select', $cell);
        // test
        // this.$dispatch({type: 'TEST'}); 
    };

    async resizeTable(event) {
        try {
            const data = await resizeHandler(this.$root, event);
            this.$dispatch(actions.tableResize(data));
            // this.$dispatch({type: 'TABLE_RESIZE', data});
            // console.log('Resize data', data);
        } catch (e) {
            console.warn('Resize error ', e.message);
        }
    };

    onMousedown(event) {
        if (shouldResize(event)) {
            // this.resizeHandler(event);
            this.resizeTable(event);
        } else if (isCell(event)) {
            const $target = $(event.target); 
            if (event.shiftKey) {
                // group of cells select

                const $cells = matrix($target, this.selection.current)
                        .map((id) => this.$root.find(`[data-id='${id}']`));
                        this.selection.selectGroup($cells);
            } else {
                // this.selection.select($target); // !!!
                this.selectCell($target);
            }
        }
    };

    onKeydown(event) {
        const keys = [
            'Enter', 
            'Tab', 
            'ArrowLeft', 
            'ArrowRight', 
            'ArrowUp',
             'ArrowDown'
            ];
        const {key} = event;
        if (keys.includes(key) && !event.shiftKey) {
            event.preventDefault();
            const id = this.selection.current.id(true);

            const $next = this.$root.find(nextSelector(key, id));
            this.selectCell($next);
        }
        
    };

    onInput(event) {
        this.$emit('Table: input', $(event.target));
    };
};


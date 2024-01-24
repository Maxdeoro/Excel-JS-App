import { ExcelComponent } from '../../core/ExcelComponent';
import { createTable } from './table.template';
import { $ } from '@core/dom';

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

    onMousedown(event) {
        if (event.target.dataset.resize) {
            const $resizer = $(event.target); // wrap into $ from dom.js
            const $parent = $resizer.closest('[data-type="resizable"]');
            const coords = $parent.getCoords();
            const type = $resizer.data.resize;
            // console.log(type);
            const cells = this.$root
                .findAll(`[data-col="${$parent.data.col}"]`);
            // console.log(coords);
            document.onmousemove = (e) => {
                console.log('mousemove');
                if (type === 'col') {
                    const delta = e.pageX - coords.right;
                    const value = coords.width + delta;
                    // $parent.$el.style.width = value + 'px';
                    $parent.css({width: value + 'px'});
                    cells.forEach((el) => {
                            el.style.width = value + 'px';
                        });
                } else {
                    const delta = e.pageY - coords.bottom;
                    const value =coords.height + delta;
                    // $parent.$el.style.height = value + 'px';
                    $parent.css({height: value + 'px'});
                }
            };
    
            document.onmouseup = (e) => {
                document.onmousemove = null;
            };
        }
    };
};
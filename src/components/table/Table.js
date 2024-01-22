import { ExcelComponent } from '../../core/ExcelComponent';
import { createTable } from './table.template';
// import { $ } from '../../core/dom';
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
            // const $parent = $resizer.$el.parentNode; // bad idea
            // eslint-disable-next-line max-len
            // const $parent = $resizer.$el.closest('.column'); // take nearst parent
            const $parent = $resizer.closest('[data-type="resizable"]');
            const coords = $parent.getCoords();
            // console.log(coords);
            document.onmousemove = (e) => {
                // console.log(mousemove);
                const delta = e.pageX - coords.right; // определение сдвига в px
                const value = coords.width + delta;
                $parent.$el.style.width = value + 'px';
                document.querySelectorAll(`[data-col="${$parent.data.col}"]`)
                    .forEach((el) => {
                        el.style.width = value + 'px';
                    });
                // console.log(delta);
            };
    
            document.onmouseup = (e) => {
                document.onmousemove = null;
            };
        }
    };
};
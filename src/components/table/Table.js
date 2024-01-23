import { ExcelComponent } from '../../core/ExcelComponent';
import { createTable } from './table.template';
// import { findAll } from '../../core/dom';
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
            const type = $resizer.data.resize;
            console.log(type);
            // console.log(coords);
            const cells = this.$root
                .findAll(`[data-col="${$parent.data.col}"]`);
            // console.log(coords);
            document.onmousemove = (e) => {
                console.log('mousemove');
                if (type === 'col') {
                    const delta = e.pageX - coords.right;
                    const value = coords.width + delta;
                    $parent.$el.style.width = value + 'px';
                    // document
                    // .querySelectorAll(`[data-col="${$parent.data.col}"]`)
                    // this.$root.findAll(`[data-col="${$parent.data.col}"]`)
                    cells.forEach((el) => {
                            el.style.width = value + 'px';
                        });
                } else {
                    const delta = e.pageY - coords.bottom;
                    const value =coords.height + delta;
                    $parent.$el.style.height = value + 'px';
                    // cells.forEach((el) => {
                    //         el.style.height = value + 'px';
                    //     });
                }
            };
    
            document.onmouseup = (e) => {
                document.onmousemove = null;
            };
        }
    };
};
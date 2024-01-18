import { ExcelComponent } from '../../core/ExcelComponent';
import { createTable } from './table.iemplate';

export class Table extends ExcelComponent {
    static className = 'excel__table';
    toHTML() {
        return createTable();
        // return `
        // <div class="row">
        //     <div class="row-info"></div>
        //     <div class="row-data">
        //         <div class="column">A</div>
        //         <div class="column">B</div>
        //         <div class="column">C</div>
        //         <div class="column">D</div>
        //         <div class="column">E</div>
        //         <div class="column">F</div>
        //         <div class="column">G</div>
        //         <div class="column">H</div>
        //         <div class="column">I</div>
        //         <div class="column">J</div>
        //     </div>
        // </div>
        // <div class="row">
        //     <div class="row-info">1</div>
        //     <div class="row-data">
        //         <div class="cell selected" contenteditable="true">bxcsd</div>
        //         <div class="cell" contenteditable="true">jdfgdh</div>
        //         <div class="cell" contenteditable>iryeu</div>
        //     </div>
        // </div>
        // <div class="row">
        //     <div class="row-info">2</div>
        //     <div class="row-data">
        //         <div class="cell" contenteditable>hfgd</div>
        //         <div class="cell" contenteditable>ljdj</div>
        //         <div class="cell" contenteditable>hdndh</div>
        //     </div>
        // </div>
        // `;
    }
};
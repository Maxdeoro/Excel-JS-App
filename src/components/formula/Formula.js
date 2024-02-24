import { ExcelComponent } from '../../core/ExcelComponent';
import { $ } from '../../core/dom';

export class Formula extends ExcelComponent {
    static className = 'excel__formula';

    constructor($root, options) {
        super($root, {
            name: 'Formula',
            listeners: ['input', 'keydown'],
            subscribe: ['currentText'],
            ...options
        });
    };

    toHTML() {
        return `
        <div class="info">fx</div>
        <div 
        revert  
        id="formula" 
        class="input" 
        contenteditable 
        spellcheck="false">
        </div>
        `;
    };

    // toHTML() {
    //     return `
    //     <div class="info">fx</div>
    //     <input id="formula" class="input" contenteditable spellcheck="false"></input>
    //     `;
    // };

    init() {
        super.init();

        this.$formula = this.$root.find('#formula');

        this.$on('Table: select', ($cell) => {
            this.$formula.text($cell.data.value);
        });
    };

    storeChanged({currentText}) {
        this.$formula.text(currentText);
        // console.log('Changes', changes);
    };

    onInput(event) {
        this.$emit('Formula: input', $(event.target).text());
    };

    onKeydown(event) {
        const keys = ['Enter', 'Tab'];
        if (keys.includes(event.key)) {
            event.preventDefault();
            this.$emit('Formula: done');
        }
    };
};
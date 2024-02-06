import { ExcelComponent } from '../../core/ExcelComponent';
import { $ } from '../../core/dom';

export class Formula extends ExcelComponent {
    static className = 'excel__formula';

    constructor($root, options) {
        super($root, {
            name: 'Formula',
            listeners: ['input', 'keydown'],
            ...options
        });
    }

    toHTML() {
        return `
        <div class="formula-info">fx</div>
        <div id="formula" class="formula-input" contenteditable spellcheck="false"></div>
        `;
    }

    init() {
        super.init();

        this.$formula = this.$root.find('#formula');

        this.$on('Table: select', ($cell) => {
            this.$formula.text($cell.text());
        });

        this.$on('Table: input', ($cell) => {
            this.$formula.text($cell.text());
        });

        // test
        // this.$subscribe((state) => {
            // console.log('Formula state ', state);
        // });
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
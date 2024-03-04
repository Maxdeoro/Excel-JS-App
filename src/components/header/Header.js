import { defaultTitle } from '../../constants';
import { ExcelComponent } from '../../core/ExcelComponent';
import { $ } from '../../core/dom';
import { changeTitle } from '../../myRedux/actions';
import { debounce } from '../../core/utils';
import { ActiveRout } from '../../core/routs/ActiveRout';

export class Header extends ExcelComponent {
    static className = 'excel__header';

    constructor($root, options) {
        super($root, {
            name: 'Header',
            listeners: ['input', 'click'],
            ...options,
        });
    };

    prepare() {
        this.onInput = debounce(this.onInput, 300);
    };

    toHTML() {
        const title = this.store.getState().title || defaultTitle;
        return `
            <input type="text" class="input" value="${title}"/>
            <div>
                <div class="button" data-button="remove">
                    <span class="material-icons" data-button="remove">delete</span>
                </div>
                <div class="button" data-button="exit">
                    <span class="material-icons" data-button="exit">exit_to_app</span>
                </div>
            </div>
            `;
    };

    onClick(event) {
        const $target = $(event.target);
        if ($target.data.button === 'remove') {
            const decision = confirm('Do you really want to remove this table?');
            if (decision) {
                localStorage.removeItem('#excel:' + ActiveRout.param);
                ActiveRout.navigate(''); // to main page
            }
        } else if ($target.data.button === 'exit') {
            ActiveRout.navigate('');
        }
    };

    onInput(event) {
        const $target = $(event.target);
        this.$dispatch(changeTitle($target.text()));
    };
};
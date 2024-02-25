import { $ } from '../dom';
import { ActiveRout } from './ActiveRout';

export class Router {
    constructor(selector, routs) {
        if (!selector) {
            throw new Error('Selector is not provided for Router');
        }
        this.$placeholder = $(selector);
        this.routs = routs;

        this.changePageHandler = this.changePageHandler.bind(this);

        this.init();
    };
    init() {
        window.addEventListener('hashchange', this.changePageHandler);
        this.changePageHandler();
    };

    changePageHandler() {
        console.log(ActiveRout.param);
        this.$placeholder.html('<h1>' + ActiveRout.path + '</h1>');
        console.log(this.$placeholder);
    };

    destroy() {
        window.removeEventListener('hashchange', this.changePageHandler);
    };
};
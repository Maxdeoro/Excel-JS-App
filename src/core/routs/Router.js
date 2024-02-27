import { $ } from '../dom';
import { ActiveRout } from './ActiveRout';

export class Router {
    constructor(selector, routs) {
        if (!selector) {
            throw new Error('Selector is not provided for Router');
        }
        this.$placeholder = $(selector);
        this.routs = routs;
        this.page = null;
        this.changePageHandler = this.changePageHandler.bind(this);

        this.init();
    };
    init() {
        window.addEventListener('hashchange', this.changePageHandler);
        this.changePageHandler();
    };

    changePageHandler() {
        if (this.page) {
            this.page.destroy();
        }
        this.$placeholder.clear();
        const Page = ActiveRout.path.includes('excel') 
           ? this.routs.excel 
           : this.routs.dashboard;

        this.page = new Page(ActiveRout.param);
        // const Page = this.routs.excel;
        // const Page = this.routs.dashboard;
        // const page = new Page();
        this.$placeholder.append(this.page.getRoot());
        
        this.page.afterRender();
    };

    destroy() {
        window.removeEventListener('hashchange', this.changePageHandler);
    };
};
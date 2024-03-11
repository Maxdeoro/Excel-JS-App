import { $ } from '../dom';
import { ActiveRout } from './ActiveRout';
import { Loader } from '../../components/Loader';

export class Router {
    constructor(selector, routs) {
        if (!selector) {
            throw new Error('Selector is not provided for Router');
        }
        this.$placeholder = $(selector);
        this.routs = routs;
        this.loader = new Loader();
        this.page = null;
        this.changePageHandler = this.changePageHandler.bind(this);

        this.init();
    };
    init() {
        window.addEventListener('hashchange', this.changePageHandler);
        this.changePageHandler();
    };

    async changePageHandler() {
        if (this.page) {
            this.page.destroy();
        }
        this.$placeholder.clear().append(this.loader);
        const Page = ActiveRout.path.includes('excel') 
           ? this.routs.excel 
           : this.routs.dashboard;

        this.page = new Page(ActiveRout.param);

        const root = await this.page.getRoot();

        this.$placeholder.clear().append(root);
        this.page.afterRender();
    };

    destroy() {
        window.removeEventListener('hashchange', this.changePageHandler);
    };
};
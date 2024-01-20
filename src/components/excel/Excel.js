import { $ } from '../../core/dom';

export class Excel {
    constructor(selector, options) {
        this.$el = $(selector);
        // this.$el = document.querySelector(selector);
        this.components = options.components || [];
    }

    getRoot() {
        const $root = $.create('div', 'excel');
        // const $root = document.createElement('div');
        // $root.classList.add('excel');

         this.components = this.components.map((Component) => {
            const $el = $.create('div', Component.className);
            const component = new Component($el);
            $el.html(component.toHTML());
            // DEBUG
            // if (component.name) {
            //     window['c' + component.name] = component;
            // }
            $root.append($el);
            return component;
        });
        return $root;
    };
    
    render() {
        this.$el.append(this.getRoot());
        // const node = document.createElement('h1');
        // node.textContent = 'Test';
        // this.$el.append(node);
        // console.log(this.components);
        this.components.forEach((component) => component.init());
    };
};
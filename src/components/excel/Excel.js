import { $ } from '../../core/dom';

export class Excel {
    constructor(selector, options) {
        this.$el = document.querySelector(selector);
        this.components = options.components || [];
    }

    getRoot() {
        const $root = $.create('div', 'excel');
        // const $root = document.createElement('div');
        // $root.classList.add('excel');

        this.components.forEach((Component) => {
            const $el = $.create('div', Component.className);
            // const $el = document.createElement('div');
            // $el.classList.add(Component.className);
            const component = new Component($el);
            $el.innerHTML = component.toHTML();
            $root.append($el);
            // console.log(component.toHTML());
            // $root.insertAdjacentHTML('beforeend', component.toHTML());
        });
        // $root.textContent = 'TEST';
        // $root.style.fontSize = '5rem';
        return $root;
    };
    
    render() {
        this.$el.appendChild(this.getRoot());
        // const node = document.createElement('h1');
        // node.textContent = 'Test';
        // this.$el.append(node);
    };
};
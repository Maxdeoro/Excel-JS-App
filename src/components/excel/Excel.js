export class Excel {
    constructor(selector, options) {
        this.$el = document.querySelector(selector);
        this.components = options.components || [];
    }

    getRoot() {
        const $root = document.createElement('div');

        this.components.forEach((Component) => {
            const component = new Component();
            // console.log(component.toHTML());
            $root.insertAdjacentHTML('beforeend', component.toHTML());
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
import { capitalize } from './utils';

export class DomListener {
    constructor($root, listeners=[]) {
        if (!$root) {
            throw new Error('No $root provided for DomListener');
        }
        this.$root = $root;
        this.listeners = listeners;
    }

    initDOMListeners() {
        // console.log(this.listeners);
        this.listeners.forEach((listener) => {
            // const method = capitalize(listener);
            const method = getMethodName(listener);
            const name = this.name || '';
            if (!this[method]) {
                // eslint-disable-next-line max-len
                throw new Error(`Method ${method} is not implemented in ${name} Component`);
            }
            this.$root.on(listener, this[method].bind(this));
        });
    };

    removeDOMListeners() {};
};

function getMethodName(eventName) {
    return 'on' + capitalize(eventName);
};


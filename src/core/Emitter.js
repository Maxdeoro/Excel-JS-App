export class Emitter {
    constructor() {
        this.listeners = {};
    };

    // dispatch
    emit(event, ...args) {
        if (Array.isArray(this.listeners[event])) {
            return false;
        }
        this.listeners[event].forEach((listener) => {
            listener(...args);
        });
        return true;
    };

    subscribe(event, fn) {
        this.listeners[event] = this.listeners[event] || [];
        this.listeners[event].push(fn);

        // unsuscribe
        return () => {
            this.listeners[event] = 
                this.listeners[event].filter(listener => listener !== fn);
        };
    };
};

const emitter = new Emitter();
emitter.subscribe('crash', data => console.log('Sub: ' + data));
emitter.emit('crash', 45);
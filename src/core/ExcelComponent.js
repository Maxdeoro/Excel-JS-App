import {DomListener} from './DomListener';

export class ExcelComponent extends DomListener {
    constructor($root, options={}) {
        super($root, options.listeners);
        this.name = options.name || '';
        this.emitter = options.emitter;
        this.prepare();
        this.unsubscribers = [];
    };

    prepare() {};

    // return component layout
    toHTML() {
        return '';
    };

    // Notice listeners about event
    $emit(event, ...args) {
        this.emitter.emit(event, ...args);
    };

    // subscribe on event
    $on(event, fn) {
        const unsub = this.emitter.subscribe(event, fn);
        this.unsubscribers.push(unsub);
    };

    init() {
        this.initDOMListeners();
    };

    // remove listener
    destroy() {
        this.removeDOMListeners();
        this.unsubscribers.forEach((unsub) => unsub());
    };
}

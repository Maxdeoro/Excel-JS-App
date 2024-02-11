import {DomListener} from './DomListener';

export class ExcelComponent extends DomListener {
    constructor($root, options={}) {
        super($root, options.listeners);
        this.name = options.name || '';
        this.store = options.store;
        this.emitter = options.emitter;
        this.subscribe = options.subscribe || [];
        this.prepare();
        this.unsubscribers = [];
        this.storeSub = null;
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

    $dispatch(action) {
        this.store.dispatch(action);
    };

    storeChanged() {};

    isWatching(key) {
        return this.subscribe.includes(key);
    };

    // $subscribe(fn) {
    //     this.storeSub = this.store.subscribe(fn);
    // };

    init() {
        this.initDOMListeners();
    };

    // remove listener
    destroy() {
        this.removeDOMListeners();
        this.unsubscribers.forEach((unsub) => unsub());
        // this.storeSub.unsubscribe();
    };
}

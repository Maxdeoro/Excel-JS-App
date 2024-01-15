import {DomListener} from './DomListener';

export class ExcelComponent extends DomListener {
    constructor($root, options={}) {
        super($root, options.listeners);
    };

    // return component layout
    toHTML() {
        return '';
    };

    init() {
        this.initDOMListeners();
    };
}

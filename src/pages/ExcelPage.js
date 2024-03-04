import { Page } from '../core/page';
import { Header } from '../components/header/Header';
import { Toolbar } from '../components/toolbar/Toolbar';
import { Formula } from '../components/formula/Formula';
import { Table } from '../components/table/Table';
import { Excel } from '../components/excel/Excel';
import { storage } from '../core/utils';
import { debounce } from '../core/utils';
import { createStore } from '../core/createStore';
import { rootReducer } from '../myRedux/rootReduser';
import { normalizeInitialState } from '../myRedux/initialState';

function storageName(param) {
    return 'excel:' + param;
};

export class ExcelPage extends Page {
    getRoot() {
        const params = this.params ? this.params : Date.now().toString();
        const state = storage(storageName(params));
        const initialState = normalizeInitialState(state);
        const store = createStore(rootReducer, initialState);

        const stateListener = debounce((state) => {
            storage(storageName(params), state);
            console.log('App State: ', state);
        }, 300);

        store.subscribe(stateListener);

        this.excel = new Excel({
            components: [Header, Toolbar, Formula, Table],
            store,
        });

    // excel.render();
    return this.excel.getRoot();
    };

    afterRender() {
        this.excel.init();
    };

    destroy() {
        this.excel.destroy();
    };
};
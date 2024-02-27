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
import { initialState } from '../myRedux/initialState';

export class ExcelPage extends Page {
    getRoot() {
        console.log(this.params);

        const store = createStore(rootReducer, initialState);

        const stateListener = debounce((state) => {
            storage('excel-state', state);
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
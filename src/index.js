import { Excel } from './components/excel/Excel';
import { Header } from './components/header/Header';
import { Toolbar } from './components/toolbar/Toolbar';
import { Formula } from './components/formula/Formula';
import { Table } from './components/table/Table';
import './scss/index.scss';
import { createStore } from './core/createStore';
import { rootReducer } from './myRedux/rootReduser';
import { storage } from './core/utils';
import { initialState } from './myRedux/initialState';

// const store = createStore(rootReducer, storage('excel-state'));
const store = createStore(rootReducer, initialState);

store.subscribe((state) => {
    console.log('App State: ', state);
    // localStorage.setItem('exel-state', JSON.stringify(state));
    storage('excel-state', state);
});

const excel = new Excel('#app', {
    components: [Header, Toolbar, Formula, Table],
    store,
});

excel.render();

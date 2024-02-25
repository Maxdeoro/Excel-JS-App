// import { Excel } from './components/excel/Excel';
// import { Header } from './components/header/Header';
// import { Toolbar } from './components/toolbar/Toolbar';
// import { Formula } from './components/formula/Formula';
// import { Table } from './components/table/Table';
// import { createStore } from './core/createStore';
// import { rootReducer } from './myRedux/rootReduser';
// import { storage, debounce } from './core/utils';
// import { initialState } from './myRedux/initialState';
import { Router } from './core/routs/Router';
import './scss/index.scss';

new Router('#app', {});
// const store = createStore(rootReducer, initialState);

// const stateListener = debounce((state) => {
//     storage('excel-state', state);
//     console.log('App State: ', state);
// }, 300);

// store.subscribe(stateListener);

// const excel = new Excel('#app', {
//     components: [Header, Toolbar, Formula, Table],
//     store,
// });

// excel.render();

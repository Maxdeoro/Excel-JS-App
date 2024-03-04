import { Router } from './core/routs/Router';
import { DashboardPage } from './pages/DashboardPage';
import { ExcelPage } from './pages/ExcelPage';
import './scss/index.scss';

new Router('#app', {
    dashboard: DashboardPage,
    excel: ExcelPage,
});


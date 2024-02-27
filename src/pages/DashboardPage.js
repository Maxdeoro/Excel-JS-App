import { Page } from '../core/page';
import { $ } from '../core/dom';

export class DashboardPage extends Page {
    getRoot() {
        return $.create('div', 'db').html(`
           <div class="db__header">
              <h1>Excel-JS dashboard</h1>
           </div>
           <div class="db__new">
              <div class="db__view">
                 <a href="#" class="db__create">New<br> tab</a>
              </div>
            </div>
            <div class="db__table db__view">
               <div class="db__list-header">
                  <span>Tab name</span>
                  <span>Date of creating</span>
               </div>
               <ul class="db__list">
                  <li class="db__record">
                      <a href="#">Tab #1</a>
                      <strong>01.06.2024</strong>
                  </li>
                  <li class="db__record">
                      <a href="#">Tab #2</a>
                      <strong>01.06.2024</strong>
                  </li>
                  <li class="db__record">
                      <a href="#">Tab #3</a>
                      <strong>01.06.2024</strong>
                  </li>
               </ul>
           </div>
        `);
    };
};
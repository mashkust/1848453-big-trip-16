import {createSiteMenuTemplate} from './view/site-menu-view.js';
import {createFilterTemplate} from './view/filter-view.js';
import {createLoadMoreButtonTemplate} from './view/sorting-view.js';
import {createTaskTemplate} from './view/form-add-view.js';
import {createTaskEditTemplate} from './view/form-edit-view.js';
import {createBoardTemplate} from './view/point-list-view.js';
import {renderTemplate, RenderPosition} from './render.js';

const TASK_COUNT = 3;

const siteHeaderElement = document.querySelector('.page-header');
const siteNavigationElement = siteHeaderElement.querySelector('.trip-controls__navigation');
const siteFiltersElement = siteHeaderElement.querySelector('.trip-controls__filters');
const tripView = siteFiltersElement.querySelector('.visually-hidden');
const FilterEvent = siteNavigationElement.querySelector('.visually-hidden');
const siteMainElement = document.querySelector('.page-body__page-main');
const tripEvents = siteMainElement.querySelector('.visually-hidden');

renderTemplate(siteHeaderElement, createSiteMenuTemplate(), RenderPosition.BEFOREEND);
renderTemplate(siteMainElement, createFilterTemplate(), RenderPosition.BEFOREEND);
renderTemplate(siteMainElement, createBoardTemplate(), RenderPosition.BEFOREEND);

const boardElement = siteMainElement.querySelector('.board');
const taskListElement = boardElement.querySelector('.board__tasks');

renderTemplate(taskListElement, createTaskEditTemplate(), RenderPosition.BEFOREEND);

for (let i = 0; i < TASK_COUNT; i++) {
  renderTemplate(taskListElement, createTaskTemplate(), RenderPosition.BEFOREEND);
}

renderTemplate(boardElement, createLoadMoreButtonTemplate(), RenderPosition.BEFOREEND);

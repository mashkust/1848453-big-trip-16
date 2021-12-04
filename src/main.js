import {createSiteMenuTemplate} from './view/site-menu-view.js';
import {createFilterTemplate} from './view/filter-view.js';
import {createSortTemplate} from './view/sort-view.js';
import {editPointTemplate} from './view/form-edit-view.js';
import {createPointTemplate} from './view/point-list-view.js';
import {renderTemplate, RenderPosition} from './render.js';
import {generatePoint} from './mock/task.js';

const TASK_COUNT = 1;
const LENGHT_POINTS_ARRAY =15;

const createPoints = () => {
  const POINTS_ARRAY = [];
  for(let index = 0; index <= LENGHT_POINTS_ARRAY-1; index++) {
    POINTS_ARRAY[index] = generatePoint(index);
  }
  return POINTS_ARRAY;
};

export const POINTS = createPoints();

const siteBodyElement = document.querySelector('.page-body');
const siteNavigationElement = siteBodyElement.querySelector('.trip-controls__navigation');
const siteFiltersElement = siteBodyElement.querySelector('.trip-controls__filters');
const siteEventsElement = siteBodyElement.querySelector('.trip-events');
const siteEventsListElement = siteEventsElement .querySelector('.trip-events__list');

renderTemplate(siteFiltersElement, createFilterTemplate(), RenderPosition.BEFOREEND);
renderTemplate(siteNavigationElement, createSiteMenuTemplate(), RenderPosition.BEFOREEND);
renderTemplate(siteEventsElement, createSortTemplate(), RenderPosition.AFTERBEGIN);
renderTemplate(siteEventsElement, editPointTemplate(POINTS), RenderPosition.AFTERBEGIN);

for (let i = 0; i < TASK_COUNT; i++) {
  renderTemplate(siteEventsListElement, createPointTemplate(POINTS), RenderPosition.BEFOREEND);
}

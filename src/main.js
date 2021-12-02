import {createSiteMenuTemplate} from './view/site-menu-view.js';
import {createFilterTemplate} from './view/filter-view.js';
import {createSortTemplate} from './view/sort-view.js';
import {editPointTemplate} from './view/form-edit-view.js';
// import {addPointTemplate} from './view/form-add-view.js';
import {createPointTemplate} from './view/point-list-view.js';
import {renderTemplate, RenderPosition} from './render.js';
import {generatePoint} from './mock/task.js';

const TASK_COUNT = 3;
const LENGHT_POINTS_ARRAY =16;

const createPoints = () => {
  const POINTS_ARRAY = [];
  for(let index = 0; index < LENGHT_POINTS_ARRAY-1; index++) {
    POINTS_ARRAY[index] = generatePoint(index);
  }
  return POINTS_ARRAY;
};

export const POINTS = createPoints();
console.log(POINTS);

const siteBodyElement = document.querySelector('.page-body');
const siteNavigationElement = siteBodyElement.querySelector('.trip-controls__navigation');
const siteFiltersElement = siteBodyElement.querySelector('.trip-controls__filters');
const siteEventsElement = siteBodyElement.querySelector('.trip-events');
// const siteAddingElement = siteBodyElement.querySelector('.trip-main__event-add-btn');

renderTemplate(siteFiltersElement, createFilterTemplate(), RenderPosition.BEFOREEND);
renderTemplate(siteNavigationElement, createSiteMenuTemplate(), RenderPosition.BEFOREEND);
renderTemplate(siteEventsElement, editPointTemplate(), RenderPosition.AFTERBEGIN);
renderTemplate(siteEventsElement, createSortTemplate(), RenderPosition.BEFOREEND);

for (let i = 0; i < TASK_COUNT; i++) {
  renderTemplate(siteEventsElement, createPointTemplate(), RenderPosition.BEFOREEND);
}

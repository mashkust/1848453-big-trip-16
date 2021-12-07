import SiteMenuView from './view/site-menu-view.js';
import FilterView from './view/filter-view.js';
import SortView from './view/sort-view.js';
import EditorView from './view/form-edit-view.js';
import PointView from './view/point-list-view.js';
import {renderTemplate,renderElement, RenderPosition} from './render.js';
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

renderElement(siteFiltersElement, new FilterView().element, RenderPosition.BEFOREEND);
renderElement(siteNavigationElement, new SiteMenuView().element, RenderPosition.BEFOREEND);
renderTemplate(siteEventsElement, new SortView().element, RenderPosition.AFTERBEGIN);
renderTemplate(siteEventsElement, new EditorView(POINTS).element, RenderPosition.AFTERBEGIN);

for (let i = 0; i < TASK_COUNT; i++) {
  renderTemplate(siteEventsListElement, new PointView(POINTS).element, RenderPosition.BEFOREEND);
}

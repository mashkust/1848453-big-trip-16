import SiteMenuView from './view/site-menu-view.js';
import FilterView from './view/filter-view.js';
import SortView from './view/sort-view.js';
import EditorView from './view/form-edit-view.js';
import PointView from './view/point-list-view.js';
import {render, RenderPosition} from './render.js';
import {generatePoint} from './mock/task.js';

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

render(siteFiltersElement, new FilterView().element, RenderPosition.BEFOREEND);
render(siteNavigationElement, new SiteMenuView().element, RenderPosition.BEFOREEND);
render(siteEventsElement, new SortView().element, RenderPosition.AFTERBEGIN);
render(siteEventsElement, new EditorView(POINTS).element, RenderPosition.AFTERBEGIN);

for (let i=1; i<POINTS.length ;i++) {
  render(siteEventsListElement, new PointView(POINTS[i]).element, RenderPosition.BEFOREEND);
}

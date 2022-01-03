// import FormEditView from './view/form-edit-view.js';
import FilterView from './view/filter-view.js';
import MessageView from './view/message-view.js';
// import PointListView from './view/point-list-view.js';
import SiteMenuView from './view/site-menu-view.js';
// import SortView from './view/sort-view.js';
import {render, RenderPosition} from './render.js';
import {generatePoint} from './mock/task.js';
import PointsPresenter from './presenter/points-presenter.js';

const LENGTH_POINTS_ARRAY =15;

const createPoints = () => {
  const POINTS_ARRAY = [];
  for(let index = 0; index <= LENGTH_POINTS_ARRAY-1; index++) {
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

if (POINTS.length === 0) {
  render(siteEventsElement, new MessageView(), RenderPosition.BEFOREEND);
}

render(siteFiltersElement, new FilterView(), RenderPosition.BEFOREEND);
render(siteNavigationElement, new SiteMenuView(), RenderPosition.BEFOREEND);

const pointPresenter = new PointsPresenter(siteEventsListElement,siteEventsListElement);
pointPresenter.init(POINTS);

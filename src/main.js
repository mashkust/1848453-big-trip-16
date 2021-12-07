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

const renderTask = (taskListElement, point) => {
  const taskComponent = new PointView(point);
  const taskEditComponent = new EditorView(point);

  const replaceCardToForm = () => {
    taskListElement.replaceChild(taskEditComponent.element, taskComponent.element);
  };

  const replaceFormToCard = () => {
    taskListElement.replaceChild(taskComponent.element, taskEditComponent.element);
  };

  taskComponent.element.querySelector('.card__btn--edit').addEventListener('click', () => {
    replaceCardToForm();
  });

  taskEditComponent.element.querySelector('form').addEventListener('submit', (evt) => {
    evt.preventDefault();
    replaceFormToCard();
  });
  render(taskListElement, taskComponent.element, RenderPosition.BEFOREEND);
  // render(taskListElement, taskEditComponent.element, RenderPosition.BEFOREEND);
};

render(siteFiltersElement, new FilterView().element, RenderPosition.BEFOREEND);
render(siteNavigationElement, new SiteMenuView().element, RenderPosition.BEFOREEND);
render(siteEventsElement, new SortView().element, RenderPosition.AFTERBEGIN);

for (let i=1; i<POINTS.length ;i++) {
  renderTask(siteEventsListElement, POINTS[i]);
}

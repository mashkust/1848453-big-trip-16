import FormEditView from './view/form-edit-view.js';
import FilterView from './view/filter-view.js';
import MessageView from './view/message-view.js';
import PointListView from './view/point-list-view.js';
import SiteMenuView from './view/site-menu-view.js';
import SortView from './view/sort-view.js';
import {generatePoint} from './mock/task.js';
import {render, RenderPosition} from './render.js';

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

const renderTask = (taskListElement, point) => {
  const taskComponent = new PointListView(point);
  const taskEditComponent = new FormEditView(point);

  const replaceCardToForm = () => {
    taskListElement.replaceChild(taskEditComponent.element, taskComponent.element);
  };

  const replaceFormToCard = () => {
    taskListElement.replaceChild(taskComponent.element, taskEditComponent.element);
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      replaceFormToCard();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  taskComponent.setEditClickHandler(() => {
    replaceCardToForm();
    document.addEventListener('keydown', onEscKeyDown);
  });

  taskEditComponent.setFormSubmitHandler(() => {
    replaceFormToCard();
    document.removeEventListener('keydown', onEscKeyDown);
  });

  // taskComponent.setEditClickHandler(() => {
  //   replaceFormToCard();
  //   document.removeEventListener('keydown', onEscKeyDown);
  // });

  render(taskListElement, taskComponent.element, RenderPosition.BEFOREEND);
};

if (POINTS.length === 0) {
  render(siteEventsElement, new MessageView().element, RenderPosition.BEFOREEND);
}

render(siteFiltersElement, new FilterView().element, RenderPosition.BEFOREEND);
render(siteNavigationElement, new SiteMenuView().element, RenderPosition.BEFOREEND);
render(siteEventsElement, new SortView().element, RenderPosition.AFTERBEGIN);

for (let i=1; i<POINTS.length ;i++) {
  renderTask(siteEventsListElement, POINTS[i]);
}

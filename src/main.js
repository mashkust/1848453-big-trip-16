// import FormEditView from './view/form-edit-view.js';
import FilterView from './view/filter-view.js';
import MessageView from './view/message-view.js';
// import PointListView from './view/point-list-view.js';
import SiteMenuView from './view/site-menu-view.js';
// import SortView from './view/sort-view.js';
import {render, RenderPosition} from './render.js';
import {generatePoint} from './mock/task.js';
import PointPresenter from './presenter/point-presenter.js';

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

// const renderTask = (taskListElement, point) => {
//   const taskComponent = new PointListView(point);
//   //console.log('taskComponent',taskComponent);
//   const taskEditComponent = new FormEditView(point);

//   const replaceCardToForm = () => {
//     replace(taskEditComponent, taskComponent);
//   };

//   const replaceFormToCard = () => {
//     replace(taskComponent, taskEditComponent);
//   };

//   const onEscKeyDown = (evt) => {
//     if (evt.key === 'Escape' || evt.key === 'Esc') {
//       evt.preventDefault();
//       replaceFormToCard();
//       document.removeEventListener('keydown', onEscKeyDown);
//     }
//   };

//   taskComponent.setEditClickHandler(() => {
//     replaceCardToForm();
//     document.addEventListener('keydown', onEscKeyDown);
//   });

//   taskEditComponent.setFormSubmitHandler(() => {
//     replaceFormToCard();
//     document.removeEventListener('keydown', onEscKeyDown);
//   });

//   render(taskListElement, taskComponent, RenderPosition.AFTERBEGIN);
// };

if (POINTS.length === 0) {
  render(siteEventsElement, new MessageView(), RenderPosition.BEFOREEND);
}

render(siteFiltersElement, new FilterView(), RenderPosition.BEFOREEND);
render(siteNavigationElement, new SiteMenuView(), RenderPosition.BEFOREEND);

const pointPresenter = new PointPresenter(siteEventsListElement,siteEventsListElement);
pointPresenter.init(POINTS);

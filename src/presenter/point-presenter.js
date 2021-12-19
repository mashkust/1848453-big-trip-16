import FormEditView from '../view/form-edit-view.js';
// import FilterView from '../view/filter-view.js';
// import MessageView from '../view/message-view.js';
import PointListView from '../view/point-list-view.js';
// import SiteMenuView from '../view/site-menu-view.js';
import SortView from '../view/sort-view.js';
import {render, RenderPosition} from '../render.js';
import TripPresenter from './trip-presenter.js';

export default class PointPresenter {
  #boardContainer = null;
  #sortContainer = null;

  #pointListComponent = new PointListView();
  #sortComponent = new SortView();
  // #formEditComponent = new FormEditView();
  // #filterComponent = new FilterView();

  #points = [];

  constructor(boardContainer,sortContainer) {
    this.#boardContainer = boardContainer;
    this.#sortContainer = sortContainer;
  }

  #renderTask= (taskListElement, point)=>{
    const taskComponent = new PointListView(point);
    const taskEditComponent = new FormEditView(point);

    const replaceCardToForm = () => {
      replace(taskEditComponent, taskComponent);
    };

    const replaceFormToCard = () => {
      replace(taskComponent, taskEditComponent);
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

    render(taskListElement, taskComponent, RenderPosition.AFTERBEGIN);
  };

  init = (points) => {
    this.#points = [...points];
    for (let i=1; i<this.#points.length ;i++) {
      this.#renderTask(this.#boardContainer,this.#points[i]);
    }
    this.#renderSort();
  }

  #renderSort = () => {
    render(this.#sortContainer, this.#sortComponent, RenderPosition.BEFOREBEGIN);
  }
}

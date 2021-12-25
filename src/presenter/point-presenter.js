import SortView from '../view/sort-view.js';
import {render, RenderPosition} from '../render.js';
import TripPresenter from './trip-presenter.js';

export default class PointPresenter {
  #boardContainer = null;
  #sortContainer = null;

  #sortComponent = new SortView();
  // #formEditComponent = new FormEditView();
  // #filterComponent = new FilterView();

  #points = [];

  constructor(boardContainer,sortContainer) {
    this.#boardContainer = boardContainer;
    this.#sortContainer = sortContainer;
  }

  #renderTask= (taskListElement, point)=>{
    const tripPresenter = new TripPresenter(taskListElement);
    tripPresenter.init(point);
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


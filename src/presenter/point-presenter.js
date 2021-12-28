import SortView from '../view/sort-view.js';
import {render, RenderPosition} from '../render.js';
import TripPresenter from './trip-presenter.js';
import {updateItem} from '../common.js';

export default class PointPresenter {
  #boardContainer = null;
  #sortContainer = null;

  #sortComponent = new SortView();
  // #formEditComponent = new FormEditView();
  // #filterComponent = new FilterView();
  #tripPresenter = new Map();
  #points = [];

  constructor(boardContainer,sortContainer) {
    this.#boardContainer = boardContainer;
    this.#sortContainer = sortContainer;
  }


  #renderTask= (taskListElement, point)=>{
    const tripPresenter = new TripPresenter(taskListElement,this.#handleTaskChange);
    tripPresenter.init(point);
    this.#tripPresenter.set(point.id, tripPresenter);
  };

  #handleTaskChange = (updatedTask) => {
    this.#points = updateItem(this.#points, updatedTask);
    this.#tripPresenter.get(updatedTask.id).setActive(updatedTask);
  }

  init = (points) => {

    this.#points = [...points];
    this.#points.forEach((el, i) => {
      this.#renderTask(this.#boardContainer,this.#points[i]);
    });
    this.#renderSort();
  }

  #renderSort = () => {
    render(this.#sortContainer, this.#sortComponent, RenderPosition.BEFOREBEGIN);
  }
}


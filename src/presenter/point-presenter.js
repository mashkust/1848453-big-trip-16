import SortView from '../view/sort-view.js';
import {render, RenderPosition} from '../render.js';
import TripPresenter from './trip-presenter.js';
import {updateItem} from '../common.js';
import {SortType} from '../mock/arrays.js';

export default class PointPresenter {
  #boardContainer = null;
  #sortContainer = null;
  #sortComponent = new SortView();
  #tripPresenter = new Map();
  #points = [];

  #currentSortType = SortType.DEFAULT;
  #sourcedBoardTasks = [];

  constructor(boardContainer,sortContainer) {
    this.#boardContainer = boardContainer;
    this.#sortContainer = sortContainer;
  }


  #renderTask= (taskListElement, point)=>{
    const tripPresenter = new TripPresenter(taskListElement,this.#handleTaskChange, this.#handleModeChange);
    tripPresenter.init(point);
    this.#tripPresenter.set(point.id, tripPresenter);
  };

  #handleTaskChange = (updatedTask) => {
    this.#points = updateItem(this.#points, updatedTask);
    this.#sourcedBoardTasks = updateItem(this.#sourcedBoardTasks, updatedTask);
    this.#tripPresenter.get(updatedTask.id).setActive(updatedTask);
  }

  init = (points) => {

    this.#points = [...points];
    this.#sourcedBoardTasks = [...points];
    this.#points.forEach((el, i) => {
      this.#renderTask(this.#boardContainer,this.#points[i]);
    });
    this.#renderSort();
  }

  #handleModeChange = () => {
    this.#tripPresenter.forEach((point) => point.resetView());
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#sortTasks(sortType);
    this.#clearTaskList();
  }

  #renderSort = () => {
    render(this.#sortContainer, this.#sortComponent, RenderPosition.AFTERBEGIN);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  }

  #sortTasks = (sortType) => {
    switch (sortType) {
      case SortType.PRICE:
        this.#points.sort((a, b) => b.baseprice - a.bbaseprice);
        break;
      default:
        this.#points = [...this.#sourcedBoardTasks];
    }

    this.#currentSortType = sortType;
  }

  #clearTaskList = () => {
    this.#tripPresenter.forEach((presenter) => presenter.destroy());
    this.#tripPresenter.clear();
  }
}

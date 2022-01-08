import SortView from '../view/sort-view.js';
import {render, RenderPosition} from '../render.js';
import TripPresenter from './trip-presenter.js';
// import {updateItem} from '../common.js';
import {SortType} from '../mock/arrays.js';

export default class PointsPresenter {
  #boardContainer = null;
  #sortContainer = null;
  #pointsModel = null;
  #sortComponent = new SortView();
  #tripPresenter = new Map();
  // #points = [];

  #currentSortType = SortType.DAY;
  // #sourcedBoardTasks = [];

  constructor(boardContainer,pointsModel) {
    this.#boardContainer = boardContainer;
    this.#sortContainer = boardContainer;
    this.#pointsModel = pointsModel;
  }

  get points() {
    switch (this.#currentSortType) {
      case SortType.PRICE:
        return [...this.#pointsModel.points].sort((a, b) => b.baseprice - a.baseprice);
    }
    return this.#pointsModel.points;
  }

  #renderTask= (taskListElement, point)=>{
    const tripPresenter = new TripPresenter(taskListElement,this.#handleTaskChange, this.#handleModeChange);
    tripPresenter.init(point);
    this.#tripPresenter.set(point.id, tripPresenter);
  };

  #handleTaskChange = (updatedTask) => {
    // this.#points = updateItem(this.#points, updatedTask);
    // this.#sourcedBoardTasks = updateItem(this.#sourcedBoardTasks, updatedTask);
    this.#tripPresenter.get(updatedTask.id).setActive(updatedTask);
  }

  init = () => {
    // this.#points = [...points];
    // this.#sourcedBoardTasks = [...points];
    this.#tripPresenter.forEach((el) => {
      this.#renderTask(this.#boardContainer,el);
    });
    this.#renderSort();
  }

  #handleModeChange = () => {
    this.#tripPresenter.forEach((point) => point.resetView());
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return false;
    }
    // this.#sortTasks(sortType);
    this.#currentSortType = sortType;
    this.#clearTaskList();
    this.#tripPresenter.forEach((el) => {
      this.#renderTask(this.#boardContainer,el);
    });
    this.#renderSort();
  }

  #renderSort = () => {
    render(this.#sortContainer, this.#sortComponent, RenderPosition.AFTERBEGIN);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  }

  // #sortTasks = (sortType) => {
  //   switch (sortType) {
  //     case SortType.PRICE:
  //       this.#points.sort((a, b) => b.baseprice - a.baseprice);
  //       break;
  //     default:
  //       this.#points = [...this.#sourcedBoardTasks];
  //   }
  //   this.#currentSortType = sortType;
  // }

  #clearTaskList = () => {
    this.#tripPresenter.forEach((presenter) => presenter.destroy());
    this.#tripPresenter.clear();
  }
}

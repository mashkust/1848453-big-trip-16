import SortView from '../view/sort-view.js';
import {render, RenderPosition} from '../render.js';
import TripPresenter from './trip-presenter.js';
import {updateItem} from '../common.js';
import {sortTaskUp, sortTaskDown} from '../utils/task.js';
import {SortType} from '../const.js';

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
    // this.#sourcedBoardTasks = [...points];
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
  }

  #renderSort = () => {
    render(this.#sortContainer, this.#sortComponent, RenderPosition.BEFOREBEGIN);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  }

  #sortTasks = (sortType) => {
    // 2. Этот исходный массив задач необходим,
    // потому что для сортировки мы будем мутировать
    // массив в свойстве _boardTasks
    switch (sortType) {
      case SortType.DATE_UP:
        this.#points.sort(sortTaskUp);
        break;
      case SortType.DATE_DOWN:
        this.#points.sort(sortTaskDown);
        break;
      default:
        // 3. А когда пользователь захочет "вернуть всё, как было",
        // мы просто запишем в _boardTasks исходный массив
        this.#points = [...this.#sourcedBoardTasks];
    }

    this.#currentSortType = sortType;
  }

}

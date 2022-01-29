import SortView from '../view/sort-view.js';
import TripPresenter from './trip-presenter.js';
import PointNewPresenter from './point-new-presenter.js';
// import {updateItem} from '../common.js';
import {render, RenderPosition,remove} from '../render.js';
import {SortType, UpdateType, UserAction} from '../mock/arrays.js';

export default class PointsPresenter {
  #boardContainer = null;
  #sortContainer = null;
  #pointsModel = null;
  #sortComponent = null;
  #tripPresenter = new Map();
  #pointNewPresenter = null;

  #currentSortType = SortType.DAY;
  // #sourcedBoardTasks = [];

  constructor(boardContainer,pointsModel) {
    this.#boardContainer = boardContainer;
    this.#sortContainer = boardContainer;
    this.#pointsModel = pointsModel;

    this.#pointNewPresenter = new PointNewPresenter(this.#boardContainer, this.#handleViewAction);
    this.#pointsModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    switch (this.#currentSortType) {
      case SortType.PRICE:
        return [...this.#pointsModel.points].sort((a, b) => b.baseprice - a.baseprice);
    }
    return this.#pointsModel.points;
  }

  init = () => {
    // this.#points = [...points];
    // this.#sourcedBoardTasks = [...points];
    this.#pointsModel.addObserver(this.#handleModelEvent);
    console.log(this.#pointsModel.points)
    this.points.forEach((el) => {
      this.#renderTask(this.#boardContainer,el);
    });
    this.#renderSort();
  }

  createPoint(point, callback) {
    // this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.ALL);
    this.#currentSortType = SortType.DAY;
    this.#pointNewPresenter.init(point, callback);
  }

  destroy = () => {
    this.#clearBoard({resetRenderedTaskCount: true, resetSortType: true});
    // remove(this.#boardContainer);

    this.#pointsModel.removeObserver(this.#handleModelEvent);
    // this.#filterModel.removeObserver(this.#handleModelEvent);
  }

  #renderTask= (taskListElement, point)=>{
    const tripPresenter = new TripPresenter(taskListElement,this.#handleViewAction, this.#handleModeChange);
    tripPresenter.init(point);
    this.#tripPresenter.set(point.id, tripPresenter);
  };

  // #handleTaskChange = (updatedTask) => {
  //   // this.#points = updateItem(this.#points, updatedTask);
  //   // this.#sourcedBoardTasks = updateItem(this.#sourcedBoardTasks, updatedTask);
  //   this.#tripPresenter.get(updatedTask.id).setActive(updatedTask);
  // }

  #handleViewAction = (actionType, updateType, update) => {
    console.log(actionType, updateType, update);
    switch (actionType) {
      case UserAction.UPDATE_TASK:
        this.#pointsModel.updateTask(updateType, update);
        break;
      case UserAction.ADD_TASK:
        this.#pointsModel.addTask(updateType, update);
        break;
      case UserAction.DELETE_TASK:
        this.#pointsModel.deleteTask(updateType, update);
        break;
    }
  }

  #handleModelEvent = (updateType, data) => {
    console.log(updateType, data);
    switch (updateType) {
      case UpdateType.PATCH:
        // - обновить часть списка (например, когда поменялось описание)
        this.#pointsModel.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearBoard();
        this.points.forEach((el) => {
          this.#renderTask(this.#boardContainer,el);
        });
        this.#renderSort();
        // - обновить список (например, когда задача ушла в архив)
        break;
      case UpdateType.MAJOR:
        this.#clearBoard({resetRenderedTaskCount: true, resetSortType: true});
        this.points.forEach((el) => {
          this.#renderTask(this.#boardContainer,el);
        });
        this.#renderSort();
        // - обновить всю доску (например, при переключении фильтра)
        break;
      case UpdateType.INIT:
        // this._isLoading = false;
        // remove(this._loadingComponent);
        this.#clearBoard();
        this.points.forEach((el) => {
          this.#renderTask(this.#boardContainer,el);
        });
        break;
    }
  }

  #handleModeChange = () => {
    this.#pointNewPresenter.destroy();
    this.#tripPresenter.forEach((point) => point.resetView());
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return false;
    }
    // this.#sortTasks(sortType);
    this.#currentSortType = sortType;
    // this.#clearTaskList();
    this.#clearBoard({resetRenderedTaskCount: true});
    this.points.forEach((el) => {
      this.#renderTask(this.#boardContainer,el);
    });
    this.#renderSort();
  }

  #renderSort = () => {
    this.#sortComponent = new SortView(this.#currentSortType);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
    render(this.#sortContainer, this.#sortComponent, RenderPosition.AFTERBEGIN);
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

  // #clearTaskList = () => {
  //   this.#tripPresenter.forEach((presenter) => presenter.destroy());
  //   this.#tripPresenter.clear();
  // }

  #clearBoard = ({resetSortType = false} = {}) => {
    // const taskCount = this.tasks.length;
    this.#tripPresenter.forEach((presenter) => presenter.destroy());
    this.#tripPresenter.clear();

    remove(this.#sortComponent);
    // remove(this.#noTaskComponent);
    // remove(this.#loadMoreButtonComponent);

    // if (resetRenderedTaskCount) {
    //   this.#renderedTaskCount = TASK_COUNT_PER_STEP;
    // } else {
    //   // На случай, если перерисовка доски вызвана
    //   // уменьшением количества задач (например, удаление или перенос в архив)
    //   // нужно скорректировать число показанных задач
    //   this.#renderedTaskCount = Math.min(taskCount, this.#renderedTaskCount);
    // }

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  }
}

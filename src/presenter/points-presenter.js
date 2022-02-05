import SortView from '../view/sort-view.js';
import LoadingView from '../view/loading-view.js';
import TripPresenter from './trip-presenter.js';
import PointNewPresenter from './point-new-presenter.js';
import MessageView from '../view/message-view';
import {render, RenderPosition,remove} from '../render.js';
import {FilterType, SortType, UpdateType, UserAction} from '../utils/arrays.js';
import dayjs from 'dayjs';

const getTime = (startDate, endDate) => dayjs(endDate).diff(startDate);

export default class PointsPresenter {
  #boardContainer = null;
  #sortContainer = null;
  #pointsModel = null;
  #filterModel = null;
  #sortComponent = null;
  #messageComponent = null;
  #tripPresenter = new Map();
  #pointNewPresenter = null;
  #destinationsModel = null;
  #offersModel = null;
  #isLoading = true;

  #currentSortType = SortType.DAY;
  #loadingComponent = new LoadingView();

  constructor(boardContainer,pointsModel, filterModel, destinationsModel, offersModel ) {
    this.#boardContainer = boardContainer;
    this.#sortContainer = boardContainer;
    this.#pointsModel = pointsModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#filterModel = filterModel;

    this.#pointNewPresenter = new PointNewPresenter(this.#boardContainer, this.#handleViewAction, this.#destinationsModel, this.#offersModel);
    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    const filterType = this.#filterModel._activeFilter;
    let filtredPoints = this.#pointsModel.points.slice();
    if (filterType !== FilterType.EVERYTHING) {
      filtredPoints=filtredPoints.filter((point) => filterType === FilterType.FUTURE ? new Date(point.dateTo) > new Date() : new Date(point.dateTo) < new Date());
    }
    switch (this.#currentSortType) {
      case SortType.PRICE:
        return filtredPoints.sort((a, b) => b.baseprice - a.baseprice);
      case SortType.TIME:
        return filtredPoints.sort((a, b) => getTime(b.dateFrom, b.dateTo) - getTime(a.dateFrom, a.dateTo));
    }
    return filtredPoints.sort((a, b) => dayjs(a.dateFrom).valueOf() - dayjs(b.dateFrom).valueOf());
  }


  init = () => {
    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.points.forEach((el) => {
      this.#renderTask(this.#boardContainer,el);
    });
    this.#renderSort();
    if (this.points.length === 0) {
      this.#renderMessage();
    }
  }

  createPoint(point,callback) {
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#currentSortType = SortType.DAY;
    this.#pointNewPresenter.init(point, callback);
  }

  destroy = () => {
    this.#clearBoard({resetSortType: true});
    this.#pointsModel.removeObserver(this.#handleModelEvent);
  }

  #renderTask= (taskListElement, point)=>{
    const tripPresenter = new TripPresenter(taskListElement,this.#handleViewAction, this.#handleModeChange, this.#destinationsModel, this.#offersModel);
    tripPresenter.init(point);
    this.#tripPresenter.set(point.id, tripPresenter);
  };

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_TASK:
        this.#pointsModel.updateTask(updateType, update);
        break;
      case UserAction.ADD_TASK:
        this.#pointsModel.addTask(updateType, update);
        break;
      case UserAction.DELETE_TASK:
        this.#pointsModel.deleteTask(updateType, update);
        this.#clearBoard();
        if ( this.points.length === 1) {
          this.#renderMessage();
        }
        this.points.forEach((el) => {
          this.#renderTask(this.#boardContainer,el);
        });
        break;
    }
  }

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointsModel.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearBoard();
        this.points.forEach((el) => {
          this.#renderTask(this.#boardContainer,el);
        });
        this.#renderSort();
        break;
      case UpdateType.MAJOR:
        this.#clearBoard({resetSortType: true});
        this.points.forEach((el) => {
          this.#renderTask(this.#boardContainer,el);
        });
        this.#renderSort();
        break;
      case UpdateType.INIT:
        break;
    }
  }

  #renderLoading = () => {
    render(this.#boardContainer, this.#loadingComponent, RenderPosition.AFTERBEGIN);
  }

  #handleModeChange = () => {
    this.#pointNewPresenter.destroy();
    this.#tripPresenter.forEach((point) => point.resetView());
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return false;
    }
    this.#currentSortType = sortType;
    this.#clearBoard();
    this.points.forEach((el) => {
      this.#renderTask(this.#boardContainer,el);
    });
    this.#renderSort();
  }

  #renderSort = () => {
    this.#sortComponent = new SortView(this.#currentSortType);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
    render(this.#sortContainer, this.#sortComponent, RenderPosition.BEFOREBEGIN);
  }

  #renderMessage = () => {
    this.#messageComponent = new MessageView();
    render(this.#boardContainer, this.#messageComponent, RenderPosition.BEFOREBEGIN);
  }

  #clearBoard = ({resetSortType = false} = {}) => {
    this.#tripPresenter.forEach((presenter) => presenter.destroy());
    this.#tripPresenter.clear();
    remove(this.#loadingComponent);
    remove(this.#sortComponent);
    remove(this.#messageComponent);
    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  }
}

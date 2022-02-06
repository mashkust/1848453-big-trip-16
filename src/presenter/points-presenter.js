import SortView from '../view/sort-view.js';
import LoadingView from '../view/loading-view.js';
import FilterMessageView from '../view/filter-message-view.js';
import TripPresenter, {State as TripPresenterViewState} from './trip-presenter.js';
import PointNewPresenter from './point-new-presenter.js';
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
  #tripPresenter = new Map();
  #pointNewPresenter = null;
  #filterListComponent= null;
  #destinationsModel = null;
  #offersModel = null;
  #callback = null;
  #removeFilterMessage = null;

  #currentSortType = SortType.DAY;
  #loadingComponent = new LoadingView();

  constructor(boardContainer,pointsModel, filterModel, destinationsModel, offersModel, callback) {
    this.#boardContainer = boardContainer;
    this.#sortContainer = boardContainer;
    this.#pointsModel = pointsModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#filterModel = filterModel;
    this.#callback = callback;

    this.#pointNewPresenter = new PointNewPresenter(this.#boardContainer, this.#handleViewAction, this.#destinationsModel, this.#offersModel, this.removeFilterMessage );
    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
    this.#renderLoading();
  }

  get points() {
    const filterType = this.#filterModel._activeFilter;
    let filtredPoints = this.#pointsModel.points.slice();
    if(filtredPoints.length === 0) {
      remove(this.#filterListComponent);
      this.#filterListComponent = new FilterMessageView(filterType);
      render(this.#boardContainer, this.#filterListComponent, RenderPosition.BEFOREEND);
    }
    if (filterType !== FilterType.EVERYTHING) {
      filtredPoints=filtredPoints.filter((point) => filterType === FilterType.FUTURE ? (new Date(point.dateFrom) >= new Date() || (new Date(point.dateFrom) < new Date() && new Date(point.dateTo) > new Date())): (new Date(point.dateTo) < new Date()|| (new Date(point.dateFrom) < new Date() && new Date(point.dateTo) > new Date())));
      if(filtredPoints.length === 0) {
        remove(this.#filterListComponent );
        this.#filterListComponent = new FilterMessageView(filterType);
        render(this.#boardContainer, this.#filterListComponent, RenderPosition.BEFOREEND);
      }
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
  }

  removeFilterMessage = (state) => {
    if (state) {
      remove(this.#filterListComponent);
    } else {
      this.#filterListComponent = new FilterMessageView(this.#filterModel._activeFilter);
      render(this.#boardContainer, this.#filterListComponent, RenderPosition.BEFOREEND);
    }
  }

  createPoint(point,callback) {
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#currentSortType = SortType.DAY;
    this.#pointNewPresenter.init(point, callback);
  }

  renderTable = () => {
    this.#clearBoard();
    this.points.forEach((el) => {
      this.#renderTask(this.#boardContainer,el);
    });
    this.#renderSort();
  }

  destroy = () => {
    this.#pointNewPresenter.destroy();
    this.#clearBoard({resetSortType: true});
    remove(this.#loadingComponent);
    this.#pointsModel.removeObserver(this.#handleModelEvent);
  }

  #renderTask= (taskListElement, point)=>{
    const tripPresenter = new TripPresenter(taskListElement,this.#handleViewAction, this.#handleModeChange, this.#destinationsModel, this.#offersModel, this.#callback);
    tripPresenter.init(point);
    this.#tripPresenter.set(point.id, tripPresenter);
  };

  #handleViewAction = async (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_TASK:
        this.#tripPresenter.get(update.id).setViewState(TripPresenterViewState.SAVING);
        try {
          await this.#pointsModel.updateTask(updateType, update);
        } catch(err) {
          this.#tripPresenter.get(update.id).setViewState(TripPresenterViewState.ABORTING);
        }
        break;
      case UserAction.ADD_TASK:
        this.#pointNewPresenter.setSaving();
        try {
          await this.#pointsModel.addTask(updateType, update);
        } catch(err) {
          this.#pointNewPresenter.setAborting();
        }
        break;
      case UserAction.DELETE_TASK:
        this.#tripPresenter.get(update.id).setViewState(TripPresenterViewState.DELETING);
        try {
          await this.#pointsModel.deleteTask(updateType, update);
        } catch(err) {
          this.#tripPresenter.get(update.id).setViewState(TripPresenterViewState.ABORTING);
        }
    }
  }

  #handleModelEvent = (updateType) => {
    switch (updateType) {
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
        remove(this.#loadingComponent);
        this.points.forEach((el) => {
          this.#renderTask(this.#boardContainer,el);
        });
        this.#renderSort();
        break;
    }
  }

  #renderLoading = () => {
    render(this.#boardContainer, this.#loadingComponent, RenderPosition.BEFOREEND);
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

  #clearBoard = ({resetSortType = false} = {}) => {
    this.#tripPresenter.forEach((presenter) => presenter.destroy());
    this.#tripPresenter.clear();
    remove(this.#filterListComponent);
    remove(this.#loadingComponent);
    remove(this.#sortComponent);
    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  }
}

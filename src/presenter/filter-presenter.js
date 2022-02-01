import FilterView from '../view/filter-view.js';
import {render, RenderPosition, remove, replace} from '../render.js';
import {FilterType, UpdateType} from '../mock/arrays.js';

export default class FilterPresenter {
  #filterContainer = null;
  #filterModel = null;
  #pointsModel = null;
  #currentFilter = null;
  #filterComponent = null;

  constructor(filterContainer, filterModel, pointsModel) {
    this.#filterContainer = filterContainer;
    this.#filterModel = filterModel;
    this.#pointsModel = pointsModel;
    this.#currentFilter = null;

    this.#filterComponent = null;

    this.#handleModelEvent = this.#handleModelEvent.bind(this);
    this.#handleFilterTypeChange = this.#handleFilterTypeChange.bind(this);

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  init = (truefalse) =>{
    this.#currentFilter = this.#filterModel.filter;

    const filters = this.#getFilters();
    const prevFilterView = this.#filterComponent;

    this.#filterComponent = new FilterView(filters, this.#currentFilter);
    this.#filterComponent.setFilterTypeChangeHandler(this.#handleFilterTypeChange);
    if (truefalse === false) {
      this.#filterComponent.deleteFilterTypeChangeHandler(this.#handleFilterTypeChange);
    }
    if (prevFilterView === null) {
      render(this.#filterContainer, this.#filterComponent, RenderPosition.AFTEREND);
      return;
    }

    replace(this.#filterComponent, prevFilterView);
    remove(prevFilterView);
  }

  #handleModelEvent = () => {
    this.init();
  }

  #handleFilterTypeChange = (filterType) => {
    if (this.#currentFilter === filterType) {
      return;
    }
    this.#filterModel.setFilter(UpdateType.MAJOR, filterType);
  }

  #getFilters = () => [
    {
      type: FilterType.EVERYTHING,
    },
    {
      type: FilterType.FUTURE,
    },
    {
      type: FilterType.PAST,
    }
  ]
}

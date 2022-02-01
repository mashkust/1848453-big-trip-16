import AbstractView from './abstract-view.js';

const createFilterTemplate = (filter, currentFilterType) => `
  <div class="trip-filters__filter">
    <input id="filter-${filter}" class="trip-filters__filter-input visually-hidden" type="radio" name="trip-filter" value="${filter}" ${filter === currentFilterType ? 'checked' : ''}>
    <label class="trip-filters__filter-label" for="filter-${filter}">${filter}</label>
  </div>
`;

const createFiltersTemplate = (filters, currentFilter) => (
  `<form class="trip-filters" action="#" method="get">
    ${filters.map((filter) => createFilterTemplate(filter.type, currentFilter)).join('\n')}
    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`
);

export default class FilterView extends AbstractView {
  #filters=null;
  #currentFilter=null;

  constructor(filters, currentFilter) {
    super();
    this.#filters = filters;
    this.#currentFilter = currentFilter;

    this.#filterChangeHandler = this.#filterChangeHandler.bind(this);
  }

  get template() {
    return createFiltersTemplate(this.#filters, this.#currentFilter);
  }

  #filterChangeHandler = (evt) => {
    evt.preventDefault();
    this._callback.filterChange(evt.target.value);
  }

  setFilterTypeChangeHandler = (callback) => {
    this._callback.filterChange = callback;
    this.element.addEventListener('change', this.#filterChangeHandler);
  }

  deleteFilterTypeChangeHandler = (callback) => {
    this._callback.filterChange = callback;
    this.element.removeEventListener('change', this.#filterChangeHandler);
  }
}

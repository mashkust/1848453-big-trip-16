import AbstractObservable from '../abstract-observable.js';
import {FilterType} from '../mock/arrays.js';

export default class FilterModel extends AbstractObservable {
  constructor() {
    super();
    this._activeFilter = FilterType.EVERYTHING;
  }

  setFilter(updateType, filter) {
    console.log('filter',filter)
    this._activeFilter = filter;
    this._notify(updateType, filter);
  }

  get filter() {
    return this._activeFilter;
  }
}

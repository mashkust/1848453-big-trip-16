import AbstractObservable from '../abstract-observable.js';
import {FilterType} from '../utils/arrays.js';

export default class FilterModel extends AbstractObservable {
  constructor() {
    super();
    this._activeFilter = FilterType.EVERYTHING;
  }

  setFilter(updateType, filter) {
    this._activeFilter = filter;
    this._notify(updateType, filter);
  }

  get filter() {
    return this._activeFilter;
  }
}

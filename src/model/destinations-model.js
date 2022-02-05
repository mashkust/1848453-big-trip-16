import AbstractObservable from '../abstract-observable.js';
import {UpdateType} from '../utils/arrays.js';

export default class DestinationsModel extends AbstractObservable {
  #apiService = null;
  #destinations = [];

  constructor(apiService) {
    super();
    this.#apiService = apiService;
  }

  get destinations() {
    return this.#destinations;
  }

  init = async () => {
    try {
      this.#destinations = await this.#apiService.destinations;
    } catch(err) {
      this.#destinations= [];
    }
    this._notify(UpdateType.MAJOR);
  }
}

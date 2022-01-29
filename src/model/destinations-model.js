import AbstractObservable from '../abstract-observable.js';
import {UpdateType} from '../mock/arrays.js';

export default class DestinationsModel extends AbstractObservable {
  #apiService = null;
  #destinations = [];

  constructor(apiService) {
    super();
    this.#apiService = apiService;
  }

  get destinations() {
    return this._destinations;
  }

  init = async () => {
    try {
      // this.#points = await this.#apiService.points;
      this._destinations = await this.#apiService.destinations;
      // this.#offers = await this.#apiService.offers;
      console.log('init',this._destinations)
    } catch(err) {
      this._destinations= [];
    }

    this._notify(UpdateType.INIT);
  }
}

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
    return this.#destinations;
  }

  init = async () => {
    try {
      // this.#points = await this.#apiService.points;
      this.#destinations = await this.#apiService.destinations;
      // this.#offers = await this.#apiService.offers;
    } catch(err) {
      this.#destinations= [];
    }
    this._notify(UpdateType.INIT);
    console.log('init',this.#destinations)
  }
}

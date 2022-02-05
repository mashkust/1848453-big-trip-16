import AbstractObservable from '../abstract-observable.js';
import {UpdateType} from '../utils/arrays.js';

export default class OffersModel extends AbstractObservable {
  #apiService = null;
  #offers = [];

  constructor(apiService) {
    super();
    this.#apiService = apiService;
  }

  get offers() {
    return this.#offers;
  }

  init = async () => {
    try {
      this.#offers = await this.#apiService.offers;
    } catch(err) {
      this.#offers = [];
    }
    this._notify(UpdateType.MAJOR);
  }

}

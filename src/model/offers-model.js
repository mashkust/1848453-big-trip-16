import AbstractObservable from '../abstract-observable.js';
import {UpdateType} from '../mock/arrays.js';

export default class OffersModel extends AbstractObservable {
  #apiService = null;
  #offers = [];

  constructor(apiService) {
    super();
    this.#apiService = apiService;
  }

  get offers() {
    return this._offers;
  }

  init = async () => {
    try {
      this._offers = await this.#apiService.offers;
      console.log('init',this._offers )
    } catch(err) {
      this._offers = [];
    }

    this._notify(UpdateType.INIT);
  }

}

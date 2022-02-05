import AbstractObservable from '../abstract-observable.js';
import {UpdateType} from '../utils/arrays.js';

export default class PointsModel extends AbstractObservable {
  #apiService = null;
  #points = [];

  constructor(apiService) {
    super();
    this.#apiService = apiService;
  }

  get points() {
    return this.#points;
  }

  init = async () => {
    try {
      this.#points = await this.#apiService.points;
    } catch(err) {
      this.#points = [];
    }

    this._notify(UpdateType.INIT);
  }

  updateTask = async (updateType, update) => {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting task');
    }

    const response = await this.#apiService.updateTask(update).catch((Error) => {
      throw new Error('Can\'t update task');
    });

    const updatedTask = {
      baseprice: response['base_price'],
      dateFrom: new Date(response['date_from']),
      dateTo: new Date(response['date_to']),
      isFavorite: response['is_favorite'],
      offers: {
        offers: response.offers.map((elem) => ({
          type: response.type,
          offers: elem,
        }))
      },
      id: Number(response.id),
      type: response.type,
      destination:response.destination,
    };
    this.#points =  this.#points.map((el) => {
      if (el.id === updatedTask.id) {
        return updatedTask;
      }
      return el;
    });
    this._notify(updateType, updatedTask);
  }

  addTask = async (updateType, update) => {
    const newPoint = await this.#apiService.addTask(update);
    const updatedTask = {
      baseprice: newPoint['base_price'],
      dateFrom: new Date(newPoint['date_from']),
      dateTo: new Date(newPoint['date_to']),
      isFavorite: newPoint['is_favorite'],
      offers: {
        offers: newPoint.offers.map((elem) => ({
          type: newPoint.type,
          offers: elem,
        }))
      },
      id: Number(newPoint.id),
      type: newPoint.type,
      destination:newPoint.destination,
    };
    this.#points = [
      updatedTask,
      ...this.#points,
    ];
    this._notify(updateType, newPoint);
  }

  deleteTask = async (updateType, update) => {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting point');
    }

    try {
      await this.#apiService.deleteTask(update);
      this.#points = [
        ...this.#points.slice(0, index),
        ...this.#points.slice(index + 1),
      ];
      this._notify(updateType);
    } catch(err) {
      throw new Error('Can\'t delete point');
    }
  }
}

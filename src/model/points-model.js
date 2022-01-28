import AbstractObservable from '../abstract-observable.js';
import {UpdateType} from '../mock/arrays.js';

export default class PointsModel extends AbstractObservable {
  #apiService = null;
  #points = [];

  constructor(apiService) {
    super();
    this.#apiService = apiService;
  }

  get points() {
    console.log('get',this.#points)
    return this.#points;
  }

  init = async () => {
    try {
      this.#points = await this.#apiService.points;
      console.log('init',this.#points)
    } catch(err) {
      this.#points = [];
    }

    this._notify(UpdateType.INIT);
  }

  // updateTask = async (updateType, update) => {
  //   const index = this.#points.findIndex((point) => point.id === update.id);

  //   if (index === -1) {
  //     throw new Error('Can\'t update unexisting task');
  //   }
  //   try {
  //     const response = await this.#apiService.updateTask(update);
  //     // const updatedTask = this.#adaptToClient(response);
  //     this.#points = [
  //       ...this.#points.slice(0, index),
  //       updatedTask,
  //       ...this.#points.slice(index + 1),
  //     ];
  //     this._notify(updateType, updatedTask);
  //   } catch(err) {
  //     throw new Error('Can\'t update task');
  //   }
  // }

  addTask = (updateType, update) => {
    this.#points = [
      update,
      ...this.#points,
    ];

    this._notify(updateType, update);
  }

  deleteTask = (updateType, update) => {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting task');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      ...this.#points.slice(index + 1),
    ];

    this._notify(updateType);
  }
}

import AbstractObservable from '../abstract-observable.js';
import {UpdateType} from '../mock/arrays.js';
import { preparePoint } from '../mock/utils.js';


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
      // this.#destinations = await this.#apiService.destinations;
      // this.#offers = await this.#apiService.offers;
      console.log('init',this.#points)
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

    try {
      console.log('update',update);
      const response = await this.#apiService.updateTask(update);
      const updatedTask = preparePoint(response);
      this.#points = [
        ...this.#points.slice(0, index),
        updatedTask,
        ...this.#points.slice(index + 1),
      ];
      this._notify(updateType, updatedTask);
    } catch(err) {
      throw new Error('Can\'t update task');
    }
  }

  addTask = async (updateType, update) => {
    const newPoint = await this.#apiService.addTask(update);
    this.#points = [
      newPoint,
      ...this.#points,
    ];
    console.log('add')

    this._notify(updateType, newPoint);
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

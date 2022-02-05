import {parseServerPoints, parseServerDestinations, parseServerOffers, prepareLocalPoint, preparePoint} from './utils/utils.js';

const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

export default class ApiService {
  #endPoint = null;
  #authorization = null;

  constructor(endPoint, authorization) {
    this.#endPoint = endPoint;
    this.#authorization = authorization;
  }

  get points() {
    return this.#load({url: 'points'})
      .then(ApiService.parseResponse)
      .then((res) => parseServerPoints(res));
  }

  get offers() {
    return this.#load({url: 'offers'})
      .then(ApiService.parseResponse)
      .then((res) => parseServerOffers(res));
  }

  get destinations() {
    return this.#load({url: 'destinations'})
      .then(ApiService.parseResponse)
      .then((res) => parseServerDestinations(res));
  }

  updateTask = async (point) => {
    const response = await this.#load({
      url: `points/${point.id}`,
      method: Method.PUT,
      body: JSON.stringify(preparePoint(point)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }

  addTask = async (point) => {
    const response = await this.#load({
      url: 'points',
      method: Method.POST,
      body: JSON.stringify(prepareLocalPoint(point)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }

  deleteTask = async (point) => {
    const response = await this.#load({
      url: `points/${point.id}`,
      method: Method.DELETE,
    });

    return response;
  }

  #load = async ({
    url,
    method = Method.GET,
    body = null,
    headers = new Headers(),
  }) => {
    headers.append('Authorization', this.#authorization);

    const response = await fetch(
      `${this.#endPoint}/${url}`,
      {method, body, headers},
    );

    try {
      ApiService.checkStatus(response);
      return response;
    } catch (err) {
      ApiService.catchError(err);
    }
  }

  static parseResponse = (response) => response.json();

  static checkStatus = (response) => {
    if (!response.ok) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }
  }

  static catchError = (err) => {
    throw err;
  }
}

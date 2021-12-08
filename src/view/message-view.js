import {createElement} from '../render.js';

const createMessageTemplate = ()=> (
  '<p class="trip-events__msg">Click New Event to create your first point</p>'
);

export default class MessageView {
  #element = null;
  #points = null;

  constructor(points) {
    this.#points = points;
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createMessageTemplate(this.#points);
  }

  removeElement() {
    this.#element = null;
  }
}

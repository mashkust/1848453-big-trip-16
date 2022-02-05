import AbstractView from './abstract-view.js';

const createMessageTemplate = ()=> (
  '<p class="trip-events__msg">Click New Event to create your first point</p>'
);

export default class MessageView extends AbstractView {

  constructor() {
    super();
  }

  get template() {
    return createMessageTemplate();
  }
}

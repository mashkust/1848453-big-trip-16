import AbstractView from './abstract-view.js';
import {MenuItem} from '../utils/arrays.js';

const createSiteMenuTemplate = () => (
  `<nav class="trip-controls__trip-tabs  trip-tabs">
    <a class="trip-tabs__btn  trip-tabs__btn--active" href="#" data-menu-type="${MenuItem.TABLE}">${MenuItem.TABLE}</a>
    <a class="trip-tabs__btn" href="#" data-menu-type="${MenuItem.STATS}">${MenuItem.STATS}</a>
  </nav>`
);

export default class SiteMenuView extends AbstractView {

  constructor() {
    super();
    this.#menuClickHandler = this.#menuClickHandler.bind(this);
  }

  get template() {
    return createSiteMenuTemplate();
  }

  #menuClickHandler = (evt) => {
    if (evt.target.tagName !== 'A') {
      return;
    }

    evt.preventDefault();
    this._callback.menuClick(evt.target.dataset.menuType);
  }

  setMenuClickHandler = (callback) =>  {
    this._callback.menuClick = callback;
    this.element.addEventListener('click', this.#menuClickHandler);
  }

  setMenuItem = (menuItem) => {
    const item = this.element.querySelector(`[data-menu-type="${menuItem}"]`);

    if (item !== null) {
      item.classList.add('trip-tabs__btn--active');
    }
  }
}

import FormEditView from '../view/form-edit-view.js';
import PointView from '../view/point-list-view.js';
import {render, RenderPosition, replace} from '../render.js';
import { createFavotiteTemplate } from '../mock/templates.js';

export default class TripPresenter {
  #taskListContainer = null;
  #changeData = null;
  #taskComponent = null;
  #taskEditComponent = null;

  #task = null;

  constructor(taskListContainer, changeData) {
    this.#taskListContainer = taskListContainer;
    this.#changeData = changeData;
  }

  setActive = (task) => {
    this.#task.isFavorite = task.isFavorite;
    const element = document.getElementById(task.id);
    if (element) {
      const button = element.querySelector('.event__favorite-btn');
      if (button) {
        button.classList.remove('event__favorite-btn--active');
        button.classList.add(createFavotiteTemplate(task));
      }
    }
  }

  init = (task) => {
    this.#task = task;
    this.#taskComponent = new PointView(task);
    this.#taskEditComponent = new FormEditView(task);
    this.#taskComponent.setEditClickHandler(this.#handleEditClick);
    this.#taskComponent.setFavoriteClickHandler(this.#handleFavoriteClick);
    this.#taskEditComponent.setFormSubmitHandler(this.#handleFormSubmit);

    // remove(this.#taskComponent);
    render(this.#taskListContainer, this.#taskComponent, RenderPosition.AFTERBEGIN);
  }

  #replaceCardToForm = () => {
    replace(this.#taskEditComponent, this.#taskComponent);
  };

  #replaceFormToCard = () => {
    replace(this.#taskComponent, this.#taskEditComponent);
  };

  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#replaceFormToCard();
      document.removeEventListener('keydown', this.#onEscKeyDown);
    }
  };

  #handleEditClick = () => {
    this.#replaceCardToForm();
    document.addEventListener('keydown', this.#onEscKeyDown);
  };

  #handleFavoriteClick = () => {
    const prev = {...this.#task, isFavorite: !this.#task.isFavorite};
    this.#changeData(prev);
  }

  #handleFormSubmit = (task) => {
    this.#changeData(task);
    this.#replaceFormToCard();
    document.removeEventListener('keydown',this.#onEscKeyDown);
  }
}

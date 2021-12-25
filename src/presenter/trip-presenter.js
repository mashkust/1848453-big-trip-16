import FormEditView from '../view/form-edit-view.js';
import PointListView from '../view/point-list-view.js';
import {render, RenderPosition, replace} from '../render.js';

export default class PointPresenter {
  #taskListContainer = null;

  #taskComponent = null;
  #taskEditComponent = null;

  #task = null;

  constructor(taskListContainer) {
    this.#taskListContainer = taskListContainer;
  }

  init = (task) => {
    this.#task = task;

    this.#taskComponent = new PointListView(task);
    this.#taskEditComponent = new FormEditView(task);

    this.#taskComponent.setEditClickHandler(this.#handleEditClick);
    this.#taskEditComponent.setFormSubmitHandler(this.#handleFormSubmit);

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

  #handleFormSubmit = () => {
    this.#replaceFormToCard();
    document.removeEventListener('keydown',this.#onEscKeyDown);
  }
}


import FormEditView from '../view/form-edit-view.js';
import PointListView from '../view/point-list-view.js';
import {render, RenderPosition, replace} from '../render.js';

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

  init = (task) => {
    this.#task = task;

    this.#taskComponent = new PointListView(task);
    this.#taskEditComponent = new FormEditView(task);

    this.#taskComponent.setEditClickHandler(this.#handleEditClick);
    // this.#taskComponent.setFavoriteClickHandler(this.#handleFavoriteClick);
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

  // #handleFavoriteClick = () => {
  //   this.#changeData({...this.#task, isFavorite: !this.#task.isFavorite});
  // }

  #handleFormSubmit = () => {
    // this.#changeData(task);
    this.#replaceFormToCard();
    document.removeEventListener('keydown',this.#onEscKeyDown);
  }
}


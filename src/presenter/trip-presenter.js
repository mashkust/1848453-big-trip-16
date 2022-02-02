import FormEditView from '../view/form-edit-view.js';
import PointView from '../view/point-view.js';
import {render, RenderPosition, replace, remove} from '../render.js';
import {UserAction, UpdateType} from '../mock/arrays.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class TripPresenter {
  #taskListContainer = null;
  #changeData = null;
  #changeMode = null;
  #taskComponent = null;
  #taskEditComponent = null;
  #destinationsModel = null;
  #offersModel = null;

  #task = null;
  #mode = Mode.DEFAULT

  constructor(taskListContainer, changeData, changeMode, destinationsModel, offersModel) {
    this.#taskListContainer = taskListContainer;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
  }

  setActive = (task) => {
    this.#task.isFavorite = task.isFavorite;
    const element = document.getElementById(task.id);
    if (element) {
      const button = element.querySelector('.event__favorite-btn');
      if (button) {
        if (task.isFavorite===true) {
          button.classList.add('event__favorite-btn--active');
        } else {
          button.classList.remove('event__favorite-btn--active');
        }
      }
    }
  }

  init = (task) => {
    this.#task = task;
    const prevTaskComponent = this.#taskComponent;
    const prevTaskEditComponent = this.#taskEditComponent;
    this.#taskComponent = new PointView(task);
    this.#taskEditComponent = new FormEditView(task, this.#destinationsModel, this.#offersModel, this.#taskComponent);
    this.#taskComponent.setEditClickHandler(this.#handleEditClick);
    this.#taskComponent.setFavoriteClickHandler(this.#handleFavoriteClick);
    this.#taskEditComponent.setFormSubmitHandler(this.#handleFormSubmit);
    this.#taskEditComponent.setDeleteClickHandler(this.#handleDeleteClick);
    this.#taskEditComponent.setEditCloseClickHandler(this.#handleCloseEditClick);

    if (prevTaskComponent === null || prevTaskEditComponent === null) {
      render(this.#taskListContainer, this.#taskComponent, RenderPosition.BEFOREEND);
      return;
    }
    if (this.#mode === Mode.DEFAULT) {
      replace(this.#taskComponent, prevTaskComponent);
    }
    if (this.#mode === Mode.EDITING) {
      replace(this.#taskEditComponent, prevTaskEditComponent);
    }
    remove(prevTaskComponent);
    remove(prevTaskEditComponent);
  }

  destroy = () => {
    remove(this.#taskComponent);
    remove(this.#taskEditComponent);
  }

  resetView = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceFormToCard();
    }
  }

  #replaceCardToForm = () => {
    replace(this.#taskEditComponent, this.#taskComponent);
    document.addEventListener('keydown', this.#onEscKeyDown);
    this.#changeMode();
    this.#mode = Mode.EDITING;
  };

  #replaceFormToCard = () => {
    replace(this.#taskComponent, this.#taskEditComponent);
    document.removeEventListener('keydown', this.#onEscKeyDown);
    this.#mode = Mode.DEFAULT;
  };

  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#replaceFormToCard();
    }
  }

  #handleEditClick = () => {
    this.#replaceCardToForm();
  };

  #handleCloseEditClick = () => {
    // this._formEditComponent.reset(this._waypoint);
    this.#replaceFormToCard();
  }


  #handleFavoriteClick = () => {
    this.#changeData({...this.#task, isFavorite: !this.#task.isFavorite});
    this.#changeData(
      UserAction.UPDATE_TASK,
      UpdateType.MINOR,
      {...this.#task, isFavorite: !this.#task.isFavorite},
    );
  }

  #handleFormSubmit = (update) => {
    this.#replaceFormToCard();
    this.#changeData(
      UserAction.UPDATE_TASK,
      UpdateType.MINOR,
      update,
    );
  }

  #handleDeleteClick = (task) => {
    this.#changeData(
      UserAction.DELETE_TASK,
      UpdateType.MAJOR,
      task,
    );
  }
}

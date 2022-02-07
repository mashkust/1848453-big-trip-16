import FormEditView from '../view/form-edit-view.js';
import PointView from '../view/point-view.js';
import {render, RenderPosition, replace, remove} from '../render.js';
import {UserAction, UpdateType} from '../utils/arrays.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export const State = {
  SAVING: 'SAVING',
  DELETING: 'DELETING',
  ABORTING: 'ABORTING',
};


export default class TripPresenter {
  #taskListContainer = null;
  #changeData = null;
  #changeMode = null;
  #taskComponent = null;
  #taskEditComponent = null;
  #destinationsModel = null;
  #offersModel = null;
  #callback= null;

  #task = null;
  #mode = Mode.DEFAULT

  constructor(taskListContainer, changeData, changeMode, destinationsModel, offersModel, callback) {
    this.#taskListContainer = taskListContainer;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#callback = callback;
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
      replace(this.#taskComponent, prevTaskEditComponent);
      this.#mode = Mode.DEFAULT;
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
      // this.#taskEditComponent.reset(this.#task);
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
    if (this.#callback) {
      this.#callback(false);
    }
  }

  #handleEditClick = () => {
    this.#replaceCardToForm();
    if (this.#callback) {
      this.#callback(true);
    }
  };

  #handleCloseEditClick = () => {
    this.#replaceFormToCard();
    if (this.#callback) {
      this.#callback(false);
    }
  }

  #handleFavoriteClick = () => {
    const update = {...this.#task, isFavorite: !this.#task.isFavorite};
    this.#changeData(
      UserAction.UPDATE_TASK,
      UpdateType.MINOR,
      update,
    );
  }

  setViewState = (state) => {
    if (this.#mode === Mode.DEFAULT) {
      return;
    }

    const resetFormState = () => {
      this.#taskEditComponent.updateData({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };
    switch (state) {
      case State.SAVING:
        this.#taskEditComponent.updateData({
          isDisabled: true,
          isSaving: true,
        });
        break;
      case State.DELETING:
        this.#taskEditComponent.updateData({
          isDisabled: true,
          isDeleting: true,
        });
        break;
      case State.ABORTING:
        this.#taskComponent.shake(resetFormState);
        this.#taskEditComponent.shake(resetFormState);
        break;
    }
  }

  #handleFormSubmit = async (update) => {
    await this.#changeData(
      UserAction.UPDATE_TASK,
      UpdateType.MINOR,
      update,
    );
    if (this.#callback) {
      this.#callback(false);
    }
  }

  #handleDeleteClick = async (update) => {
    await this.#changeData(
      UserAction.DELETE_TASK,
      UpdateType.MINOR,
      update);
    if (this.#callback) {
      this.#callback(false);
    }
  }
}

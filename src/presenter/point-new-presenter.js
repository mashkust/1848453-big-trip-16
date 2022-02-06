import FormAddView from '../view/form-add-view.js';
import {remove, render, RenderPosition} from '../render.js';
import {UserAction, UpdateType} from '../utils/arrays.js';

export default class PointNewPresenter {
  #taskListContainer = null;
  #changeData = null;
  #taskAddComponent = null;
  #destinationsModel = null;
  #offersModel = null;
  #deleteTextCallback = null;
  _destroyCallback = null

  constructor(taskListContainer, changeData ,destinationsModel, offersModel, deleteTextCallback) {
    this.#taskListContainer = taskListContainer;
    this.#changeData = changeData;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#deleteTextCallback = deleteTextCallback;

  }

  init = (point, callback) => {
    if ( this.#deleteTextCallback) {
      this.#deleteTextCallback(true);
    }
    this._destroyCallback = callback;

    if (this.#taskAddComponent !== null) {
      return;
    }
    this.#taskAddComponent = new FormAddView(point, this.#destinationsModel, this.#offersModel);
    this.#taskAddComponent.setFormSubmitHandler(this.#handleFormSubmit);
    this.#taskAddComponent.setDeleteClickHandler(this.#handleCancelClick);

    render(this.#taskListContainer, this.#taskAddComponent, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  setSaving = () => {
    this.#taskAddComponent.updateData({
      isDisabled: true,
      isSaving: true,
    });
  }

  destroy = () => {
    if (this._destroyCallback !== null) {
      this._destroyCallback();
    }

    if (this.#taskAddComponent === null) {
      return;
    }

    remove(this.#taskAddComponent);
    this.#taskAddComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  setAborting = () => {
    const resetFormState = () => {
      this.#taskAddComponent.updateData({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#taskAddComponent.shake(resetFormState);
  }

  #handleFormSubmit = async (task) => {
    await this.#changeData(
      UserAction.ADD_TASK,
      UpdateType.MAJOR,
      task,
    );
    this.destroy();
  }

  #handleCancelClick = () => {
    this.destroy();
    if ( this.#deleteTextCallback) {
      this.#deleteTextCallback(false);
    }
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  }
}

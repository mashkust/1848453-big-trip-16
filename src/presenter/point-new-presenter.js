// import FormEditView from '../view/form-edit-view.js';
import FormAddView from '../view/form-add-view.js';
import {nanoid} from 'nanoid';
import {remove, render, RenderPosition} from '../render.js';
import {UserAction, UpdateType} from '../mock/arrays.js';

export default class PointNewPresenter {
  #taskListContainer = null;
  #changeData = null;
  #taskAddComponent = null;
  #destinationsModel = null;
  #offersModel = null;

  constructor(taskListContainer, changeData ,destinationsModel, offersModel) {
    this.#taskListContainer = taskListContainer;
    this.#changeData = changeData;
    console.log('destinationsModel',destinationsModel);
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
  }

  init = (point, callback) => {

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

  // #getDestinations = () => this.#destinationsModel.destinations

  destroy = () => {
    if (this._destroyCallback !== null) {
      console.log('this._destroyCallback',this._destroyCallback);
      this._destroyCallback();
    }

    if (this.#taskAddComponent === null) {
      return;
    }

    remove(this.#taskAddComponent);
    this.#taskAddComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #handleFormSubmit = (task) => {
    this.#changeData(
      UserAction.ADD_TASK,
      UpdateType.MINOR,
      task,
    );
    this.destroy();
  }

  #handleCancelClick = () => {
    this.destroy();
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  }
}

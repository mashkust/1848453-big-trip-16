// import FormEditView from '../view/form-edit-view.js';
import FormAddView from '../view/form-add-view.js';
// import {nanoid} from 'nanoid';
import {remove, render, RenderPosition} from '../render.js';
// import {UserAction, UpdateType} from '../mock/arrays.js';

export default class PointNewPresenter {
  #taskListContainer = null;
  #changeData = null;
  #taskAddComponent = null;

  constructor(taskListContainer, changeData) {
    this.#taskListContainer = taskListContainer;
    this.#changeData = changeData;
  }

  init = (point) => {
    if (this.#taskAddComponent !== null) {
      return;
    }
    this.#taskAddComponent = new FormAddView(point);
    // this.#taskAddComponent.setFormSubmitHandler(this.#handleFormSubmit);
    //this.#taskAddComponent.setDeleteClickHandler(this.#handleCancelClick);

    render(this.#taskListContainer, this.#taskAddComponent, RenderPosition.AFTERBEGIN);

    // document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  // destroy = () => {
  //   if (this.#taskAddComponent === null) {
  //     return;
  //   }

  //   remove(this.#taskAddComponent);
  //   this.#taskAddComponent = null;

  //   document.removeEventListener('keydown', this.#escKeyDownHandler);
  // }

  // #handleFormSubmit = (task) => {
  //   this.#changeData(
  //     UserAction.ADD_TASK,
  //     UpdateType.MINOR,
  //     // Пока у нас нет сервера, который бы после сохранения
  //     // выдывал честный id задачи, нам нужно позаботиться об этом самим
  //     {id: nanoid(), ...task},
  //   );
  //   this.destroy();
  // }

  // #handleCancelClick = () => {
  //   this.destroy();
  // }

  // #escKeyDownHandler = (evt) => {
  //   if (evt.key === 'Escape' || evt.key === 'Esc') {
  //     evt.preventDefault();
  //     this.destroy();
  //   }
  // }
}

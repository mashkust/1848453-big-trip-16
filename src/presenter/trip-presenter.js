import FormEditView from '../view/form-edit-view.js';
import PointListView from '../view/point-list-view.js';
import {render, RenderPosition, replace,remove} from '../render.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class PointPresenter {
  #taskListContainer = null;

  #taskComponent = null;
  #taskEditComponent = null;
  #changeMode = null;
  #task = null;
  #mode = Mode.DEFAULT

  constructor(taskListContainer,changeMode) {
    this.#taskListContainer = taskListContainer;
    this.#changeMode = changeMode;
  }

  init = (task) => {
    this.#task = task;

    this.#taskComponent = new PointListView(task);
    this.#taskEditComponent = new FormEditView(task);

    const prevTaskComponent = this.#taskComponent;
    const prevTaskEditComponent = this.#taskEditComponent;

    this.#taskComponent.setEditClickHandler(this.#handleEditClick);
    this.#taskEditComponent.setFormSubmitHandler(this.#handleFormSubmit);
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
    this.#changeMode();
    this.#mode = Mode.EDITING;
  };

  #replaceFormToCard = () => {
    replace(this.#taskComponent, this.#taskEditComponent);
    this.#mode = Mode.DEFAULT;
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

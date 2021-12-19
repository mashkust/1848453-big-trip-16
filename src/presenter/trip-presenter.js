import FormEditView from '../view/form-edit-view.js';
import FilterView from '../view/filter-view.js';
import MessageView from '../view/message-view.js';
import PointListView from '../view/point-list-view.js';
import SiteMenuView from '../view/site-menu-view.js';
import SortView from '../view/sort-view.js';
import {render, RenderPosition, replace} from '../utils/render.js';

export default class TripPresenter {
  #boardContainer = null;

  #pointListComponent = new PointListView();
  #sortComponent = new SortView();
  #formEditComponent = new FormEditView();
  #filterComponent = new FilterView();

  #boardTasks = [];

  constructor(boardContainer) {
    this.#boardContainer = boardContainer;
  }

  init = (boardTasks) => {
    this.#boardTasks = [...boardTasks];
    // Метод для инициализации (начала работы) модуля,
    // малая часть текущей функции renderBoard в main.js
  }

  #renderSort = () => {
    // Метод для рендеринга сортировки
  }

  #renderTask = () => {
    // Метод, куда уйдёт логика созданию и рендерингу компонетов задачи,
    // текущая функция renderTask в main.js
  }

  #renderTasks = () => {
    // Метод для рендеринга N-задач за раз
  }

  #renderNoTasks = () => {
    // Метод для рендеринга заглушки
  }

  #renderLoadMoreButton = () => {
    // Метод, куда уйдёт логика по отрисовке кнопки допоказа задач,
    // сейчас в main.js является частью renderBoard
  }

  #renderBoard = () => {
    // Метод для инициализации (начала работы) модуля,
    // бОльшая часть текущей функции renderBoard в main.js
  }
}

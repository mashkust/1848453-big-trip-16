import FilterModel from './model/filter-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import SiteMenuView from './view/site-menu-view.js';
import StatsView from './view/stats-view';
import {render, RenderPosition,remove} from './render.js';
import {defaultPoint} from './utils/utils.js';
import {MenuItem} from './utils/arrays.js';
import PointsPresenter from './presenter/points-presenter.js';
import DestinationsModel from './model/destinations-model.js';
import OffersModel from './model/offers-model.js';
import PointsModel from './model/points-model.js';
import ApiService from './api-service.js';

const AUTHORIZATION = 'Basic hS2sfS44wcuih2j';
const END_POINT = 'https://16.ecmascript.pages.academy/big-trip';

const siteBodyElement = document.querySelector('.page-body');
const siteNavigationElement = siteBodyElement.querySelector('.trip-controls__navigation');
const siteFiltersElement = siteBodyElement.querySelector('.trip-controls__filters');
const siteEventsElement = siteBodyElement.querySelector('.trip-events');
const siteEventsListElement = siteEventsElement .querySelector('.trip-events__list');

const pointsModel = new PointsModel(new ApiService(END_POINT, AUTHORIZATION));
const filterModel = new FilterModel();
const offersModel = new OffersModel(new ApiService(END_POINT, AUTHORIZATION));
const destinationsModel = new DestinationsModel(new ApiService(END_POINT, AUTHORIZATION));
const siteMenuComponent = new SiteMenuView();
const filterPresenter = new FilterPresenter(siteFiltersElement, filterModel, pointsModel);

const addPointComponent = document.querySelector('.trip-main__event-add-btn');

const handlePointNew = () => {
  addPointComponent.disabled = false;
};

const handlePoinEdit = (newState) => {
  addPointComponent.disabled = newState;
};

const pointsPresenter = new PointsPresenter(siteEventsListElement, pointsModel, filterModel, destinationsModel, offersModel, handlePoinEdit);

let statsComponent = null;
addPointComponent.addEventListener('click', (evt) => {
  evt.preventDefault();
  pointsPresenter.createPoint(defaultPoint(), handlePointNew);
  addPointComponent.disabled = true;
});

const handleSiteMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.TABLE:
      addPointComponent.disabled = false;
      pointsPresenter.destroy();
      pointsPresenter.renderTable();
      pointsPresenter.init();
      filterPresenter.init(true);
      remove(statsComponent);
      siteMenuComponent.element.querySelector(`[data-menu-type="${MenuItem.STATS}"]`).classList.remove('trip-tabs__btn--active');
      siteMenuComponent.setMenuItem(MenuItem.TABLE);
      break;
    case MenuItem.STATS:
      pointsPresenter.destroy();
      filterPresenter.init(false);
      statsComponent = new StatsView(pointsModel.points);
      render(siteEventsListElement, statsComponent.element, RenderPosition.AFTERBEGIN);
      siteMenuComponent.element.querySelector(`[data-menu-type="${MenuItem.TABLE}"]`).classList.remove('trip-tabs__btn--active');
      siteMenuComponent.setMenuItem(MenuItem.STATS);
      addPointComponent.disabled = true;
      break;
  }
};

pointsModel.init().finally(() => {
  pointsPresenter.init();
  render(siteNavigationElement, siteMenuComponent, RenderPosition.BEFOREEND);
  siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);
});

destinationsModel.init();
offersModel.init();
filterPresenter.init(true);

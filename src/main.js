import FilterView from './view/filter-view.js';
import MessageView from './view/message-view.js';
import SiteMenuView from './view/site-menu-view.js';
import StatsView from './view/stats-view';
import {render, RenderPosition,remove} from './render.js';
import {generatePoint,defaultPoint} from './mock/task.js';
import {MenuItem} from './mock/arrays.js';
import PointsPresenter from './presenter/points-presenter.js';
import PointsModel from './model/points-model.js';
import ApiService from './api-service.js';

const LENGTH_POINTS_ARRAY =15;
const AUTHORIZATION = 'Basic hS2sfS44wcuih2j';
const END_POINT = 'https://16.ecmascript.pages.academy/big-trip';

const createPoints = () => {
  const POINTS_ARRAY = [];
  for(let index = 0; index <= LENGTH_POINTS_ARRAY-1; index++) {
    POINTS_ARRAY[index] = generatePoint(index);
  }
  return POINTS_ARRAY;
};

export const POINTS = createPoints();

const siteBodyElement = document.querySelector('.page-body');
const siteNavigationElement = siteBodyElement.querySelector('.trip-controls__navigation');
const siteFiltersElement = siteBodyElement.querySelector('.trip-controls__filters');
const siteEventsElement = siteBodyElement.querySelector('.trip-events');
const siteEventsListElement = siteEventsElement .querySelector('.trip-events__list');

if (POINTS.length === 0) {
  render(siteEventsElement, new MessageView(), RenderPosition.BEFOREEND);
}

const pointsModel = new PointsModel(new ApiService(END_POINT, AUTHORIZATION));
// pointsModel.points = POINTS;

// const filterModel = new FilterModel();

render(siteFiltersElement, new FilterView(), RenderPosition.BEFOREEND);
// render(siteNavigationElement, new SiteMenuView(), RenderPosition.BEFOREEND);

const pointsPresenter = new PointsPresenter(siteEventsListElement, pointsModel);

const siteMenuComponent = new SiteMenuView();

const addPointComponent = document.querySelector('.trip-main__event-add-btn');

const handlePointNew = () => {
  addPointComponent.disabled = false;
};

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
      pointsPresenter.init();
      remove(statsComponent);
      siteMenuComponent.element.querySelector(`[data-menu-type="${MenuItem.STATS}"]`).classList.remove('trip-tabs__btn--active');
      siteMenuComponent.setMenuItem(MenuItem.TABLE);
      break;
    case MenuItem.STATS:
      addPointComponent.disabled = true;
      pointsPresenter.destroy();
      statsComponent = new StatsView(pointsModel.points);
      render(siteEventsListElement, statsComponent.element, RenderPosition.AFTERBEGIN);
      siteMenuComponent.element.querySelector(`[data-menu-type="${MenuItem.TABLE}"]`).classList.remove('trip-tabs__btn--active');
      siteMenuComponent.setMenuItem(MenuItem.STATS);
      break;
  }
};

pointsPresenter.init();
// pointsModel.init();

pointsModel.init().finally(() => {
  render(siteNavigationElement, siteMenuComponent, RenderPosition.BEFOREEND);
  siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);
});

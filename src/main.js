import FilterView from './view/filter-view.js';
import MessageView from './view/message-view.js';
import SiteMenuView from './view/site-menu-view.js';
import StatsView from './view/stats-view';
import {render, RenderPosition,remove} from './render.js';
import {generatePoint,defaultPoint} from './mock/task.js';
import {MenuItem} from './mock/arrays.js';
import PointsPresenter from './presenter/points-presenter.js';
import PointsModel from './model/points-model.js';

const LENGTH_POINTS_ARRAY =15;

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

const pointsModel = new PointsModel();
pointsModel.points = POINTS;

// const filterModel = new FilterModel();

render(siteFiltersElement, new FilterView(), RenderPosition.BEFOREEND);
// render(siteNavigationElement, new SiteMenuView(), RenderPosition.BEFOREEND);

const pointsPresenter = new PointsPresenter(siteEventsListElement, pointsModel);
pointsPresenter.init();

document.querySelector('.trip-main__event-add-btn').addEventListener('click', (evt) => {
  evt.preventDefault();
  pointsPresenter.createTask(defaultPoint());
});

const siteMenuComponent = new SiteMenuView();
render(siteNavigationElement, siteMenuComponent.element, RenderPosition.BEFOREEND);

// const newPointAdd = document.querySelector('.trip-main__event-add-btn');

// const handlePointNewFormClose = () => {
//   newPointAdd.disabled = false;
// };

let statsComponent = null;

const handleSiteMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.TABLE:
      pointsPresenter.destroy();
      pointsPresenter.init();
      remove(statsComponent);
      siteMenuComponent.element.querySelector(`[data-menu-type="${MenuItem.STATS}"]`).classList.remove('trip-tabs__btn--active');
      siteMenuComponent.setMenuItem(MenuItem.TABLE);
      document.querySelector('.trip-main__event-add-btn').addEventListener('click', (evt) => {
        evt.preventDefault();
        pointsPresenter.createTask(defaultPoint());
      });
      break;
    case MenuItem.STATS:
      pointsPresenter.destroy();
      statsComponent = new StatsView(pointsModel.points);
      console.log(statsComponent);
      // render(siteEventsElement.firstChild, statsComponent, RenderPosition.AFTEREND);
      siteMenuComponent.element.querySelector(`[data-menu-type="${MenuItem.TABLE}"]`).classList.remove('trip-tabs__btn--active');
      siteMenuComponent.setMenuItem(MenuItem.STATS);
      break;
  }
};

// newPointAdd.addEventListener('click', (evt) => {
//   evt.preventDefault();
//   remove(statsComponent);
//   pointsPresenter.destroy();
//   // filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
//   pointsPresenter.init();
//   pointsPresenter.createPoint(handlePointNewFormClose);
//   siteMenuComponent.element.querySelector(`[data-menu-type="${MenuItem.STATS}"]`).classList.remove('trip-tabs__btn--active');
//   siteMenuComponent.setMenuItem(MenuItem.TABLE);
//   newPointAdd.disabled = true;
// });

siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);

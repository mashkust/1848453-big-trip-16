import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import SmartView from './smart-view.js';
import {createPriceStats,createTypeStats,createTimeStats,makePointsTypes} from '../utils/utils.js';
import {chartColors} from '../utils/arrays.js';

const BAR_HEIGHT = 300;

const renderChart = (points, someCtx, title, label) => {
  const pointsType = makePointsTypes(points);
  someCtx.height = BAR_HEIGHT * pointsType.length;

  const someChart = new Chart(someCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: [...points.keys()].map((type) => type),
      datasets: [{
        data:[...points.values()],
        backgroundColor: chartColors.WHITE,
        hoverBackgroundColor: chartColors.WHITE,
        anchor: 'start',
        barThickness: 44,
        minBarLength: 50,
      }],
    },
    options: {
      responsive: false,
      plugins: {
        datalabels: {
          font: {
            size: 13,
          },
          color: chartColors.BLACK,
          anchor: 'end',
          align: 'start',
          formatter: (val) => `${val}${label}`,
        },
      },
      title: {
        display: true,
        text: title,
        fontColor:  chartColors.BLACK,
        fontSize: 23,
        position: 'left',
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor:  chartColors.BLACK,
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
  return someChart;
};

const createStatsTemplate = () => (
  `<section class="statistics">
  <h2 class="visually-hidden">Trip statistics</h2>
  <div class="statistics__item ">
    <canvas class="statistics__chart statistics__chart--money" id="money" width="900"></canvas>
  </div>
  <div class="statistics__item">
    <canvas class="statistics__chart statistics__chart--type" id= "type" width="900"></canvas>
  </div>
  <div class="statistics__item">
    <canvas class="statistics__chart statistics__chart--time" id= "time" width="900"></canvas>
  </div>
</section>`);

export default class StatsView extends SmartView {
  constructor(point) {
    super();

    this._data = point;

    this._moneyChart = null;
    this._typeChart = null;
    this._timeChart = null;

    this.#setCharts();
  }

  removeElement = () => {
    super.removeElement();

    if (this._moneyChart !== null || this._typeChart !== null || this._timeChart !== null) {
      this._moneyChart = null;
      this._typeChart = null;
      this._timeChart = null;
    }
  }

  get template() {
    return createStatsTemplate();
  }

  #setCharts = () => {
    if (this._moneyChart !== null || this._typeChart !== null || this._timeChart !== null) {
      this._moneyChart = null;
      this._typeChart = null;
      this._timeChart = null;
    }

    const moneyCtx = this.element.querySelector('.statistics__chart--money');
    const typeCtx = this.element.querySelector('.statistics__chart--type');
    const timeCtx = this.element.querySelector('.statistics__chart--time');

    const money = new Map(createPriceStats(this._data));
    const type = new Map(createTypeStats(this._data));
    const time = new Map(createTimeStats(this._data));

    this._moneyChart = renderChart(money, moneyCtx, 'MONEY', '€');
    this._typeChart = renderChart(type, typeCtx, 'TYPE', 'x');
    this._timeChart = renderChart(time, timeCtx, 'TIME', 'H');
  }
}

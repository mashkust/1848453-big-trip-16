import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import SmartView from './smart-view.js';

const BAR_HEIGHT = 55;

const renderChart = (someCtx, title, label) => {
  someCtx.height = BAR_HEIGHT * 5;

  const someChart = new Chart(someCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: '',
      datasets: [{
        data:'',
        backgroundColor: '#ffffff',
        hoverBackgroundColor: '#ffffff',
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
          color: '#000000',
          anchor: 'end',
          align: 'start',
          formatter: (val) => `${val}${label}`,
        },
      },
      title: {
        display: true,
        text: title,
        fontColor: '#000000',
        fontSize: 23,
        position: 'left',
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: '#000000',
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
  ` <section class="statistics">
  <h2>Trip statistics</h2>

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

    const moneyCtx = this.element.getElementById('money');
  //   const typeCtx = this.element.querySelector('.statistics__chart--type');
  //   // const timeCtx = this.element.querySelector('#time');

    this._moneyChart = renderChart(moneyCtx, 'MONEY', '€');
  //   this._typeChart = renderChart(typeCtx, 'TYPE', 'x');
  //   // this._timeChart = renderChart(timeCtx);
  // }
  }
}

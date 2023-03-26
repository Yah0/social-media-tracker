import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import Chart from 'chart.js/auto';

export default class BubbleChartComponent extends Component {
  @service upfluenceStream;

  @tracked chart = null;
  @tracked interval = null;

  constructor() {
    super(...arguments);
    this.setupInterval();
  }

  setupInterval() {
    this.interval = setInterval(() => {
      if (this.upfluenceStream.isStreaming) {
        this.updateChart();
      }
    }, 4000);
  }

  @action
  async createChart(element) {
    const chartData = {
      datasets: [
        {
          data: [],
          backgroundColor: [],
        },
      ],
    };

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      resizeDelay: 500,
      scales: {
        x: {
          type: 'linear',
          position: 'bottom',
          min: -1,
          max: 24,
          ticks: {
            stepSize: 1,
            callback: (value) => {
              if (value >= 0 && value <= 23) {
                return `${value}:00`;
              } else {
                return '';
              }
            },
          },
        },
        y: {
          type: 'linear',
          position: 'left',
          min: -1,
          max: 7,
          ticks: {
            values: [0, 1, 2, 3, 4, 5, 6],
            callback: (value) =>
              [
                'Sunday',
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Friday',
                'Saturday',
              ][value],
          },
        },
      },
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          callbacks: {
            label: (context) => {
              const dataset = chartData.datasets[context.datasetIndex];
              const value = dataset.data[context.dataIndex].r;
              return `Social media activity: ${value}`;
            },
          },
        },
      },
    };

    this.chart = new Chart(element, {
      type: 'bubble',
      data: chartData,
      options: options,
    });
  }

  @action
  updateChart() {
    const chartData = this.chart.data;

    const socialPosts = this.upfluenceStream.socialPosts;

    socialPosts.forEach((post) => {
      const date = new Date(post.timestamp * 1000);
      const hour = date.getHours();
      const day = date.getDay();

      const dataObject = chartData.datasets[0].data.find((dataObject) => {
        return dataObject.x === hour && dataObject.y === day;
      });

      if (dataObject) {
        dataObject.r++;
      } else {
        const r = 1;
        const backgroundColor = `rgba(${255 - r * 2}, 0, 0, 1)`;
        chartData.datasets[0].data.push({
          x: hour,
          y: day,
          r: r,
        });
        chartData.datasets[0].backgroundColor.push(backgroundColor);
      }
    });
    this.upfluenceStream.socialPosts.splice(0, socialPosts.length);

    this.chart.update();
  }

  willDestroy() {
    super.willDestroy(...arguments);
    clearInterval(this.interval);
  }
}

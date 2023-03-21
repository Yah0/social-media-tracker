import Component from '@glimmer/component';
import { action } from '@ember/object';
import Chart from 'chart.js/auto';
import { inject as service } from '@ember/service';

export default class BubbleChartComponent extends Component {
  @service upfluenceStream;

  chart = null;
  interval = null;

  @action
  async createChart(element) {
    const chartData = {
      datasets: [
        {
          label: 'Commit Activity by Day and Hour',
          data: [],
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
        },
      ],
    };

    const options = {
      scales: {
        x: {
          type: 'linear',
          position: 'bottom',
        },
        y: {
          type: 'linear',
          position: 'left',
        },
      },
    };

    this.chart = new Chart(element, {
      type: 'bubble',
      data: chartData,
      options: options,
    });

    // Update chart data every 5 seconds
    this.interval = setInterval(() => {
      const socialPosts = this.upfluenceStream.socialPosts;
      this.chart.data.datasets[0].data = socialPosts.map((post) => {
        return {
          x: post.timestamp,
          y: post.timestamp,
          r: 10,
        };
      });
      this.chart.update();
    }, 5000);
  }

  willDestroy() {
    // Clear the interval when the component is destroyed
    super.willDestroy(...arguments);
    clearInterval(this.interval);
  }
}

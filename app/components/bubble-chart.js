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
          data: [],
          backgroundColor: [],
        },
      ],
    };

    const options = {
      responsive: true,
      maintainAspectRatio: false,
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

    // Update chart data every 5 seconds
    this.interval = setInterval(() => {
      const socialPosts = this.upfluenceStream.socialPosts; // get updated social posts

      socialPosts.forEach((post) => {
        const date = new Date(post.timestamp * 1000);
        const hour = date.getHours();
        const day = date.getDay();

        // Check if a bubble with the same date and time already exists in the chart data
        const dataObject = chartData.datasets[0].data.find((dataObject) => {
          return dataObject.x === hour && dataObject.y === day;
        });

        if (dataObject) {
          // If a bubble already exists, increment its r value
          dataObject.r++;
        } else {
          // If a bubble doesn't exist, add a new bubble to the chart data
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

      // Remove the posts that have already been added to the chart
      this.upfluenceStream.socialPosts.splice(0, socialPosts.length);

      this.chart.update();
    }, 1000);
  }

  willDestroy() {
    // Clear the interval when the component is destroyed
    super.willDestroy(...arguments);
    clearInterval(this.interval);
  }
}

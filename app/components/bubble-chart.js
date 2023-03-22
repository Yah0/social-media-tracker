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
    // Initialize an array to hold the data for each hour and day of the week
    const data = Array(24)
      .fill()
      .map(() => Array(7).fill(0));

    const chartData = {
      datasets: [
        {
          data: [],
          backgroundColor: 'rgba(255,0,0,1)',
        },
      ],
    };

    const options = {
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
              const value = context.raw.actualValue;
              return `Social media activity: ${value}`;
            },
          },
        },
      },
      legend: {
        display: false,
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

      // Iterate over the socialPosts and increment the appropriate element in the array
      socialPosts.forEach((post) => {
        const date = new Date(post.timestamp * 1000);
        const hour = date.getHours();
        const day = date.getDay();
        data[hour][day]++;
      });

      chartData.datasets[0].data = [];
      chartData.datasets[0].backgroundColor = [];

      data.forEach((hourData, hour) => {
        hourData.forEach((count, day) => {
          const r = count > 15 ? 15 : count; // cap the radius at 15
          const backgroundColor = `rgba(${255 - count * 2}, 0, 0, 1)`;
          chartData.datasets[0].data.push({
            x: hour,
            y: day,
            r: r,
            actualValue: count,
          });
          chartData.datasets[0].backgroundColor.push(backgroundColor);
        });
      });
      this.chart.update();
    }, 500);
  }

  willDestroy() {
    // Clear the interval when the component is destroyed
    super.willDestroy(...arguments);
    clearInterval(this.interval);
  }
}

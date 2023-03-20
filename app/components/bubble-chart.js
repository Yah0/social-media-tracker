import Component from '@glimmer/component';
import { action } from '@ember/object';
import Chart from 'chart.js/auto';

export default class BubbleChartComponent extends Component {
  @action
  createChart(element) {
    const data = {
      datasets: [
        {
          label: 'Commit Activity by Day and Hour',
          data: [
            { x: 10, y: 20, r: 10 },
            { x: 15, y: 10, r: 20 },
            { x: 25, y: 15, r: 30 },
          ],
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

    const chart = new Chart(element, {
      type: 'bubble',
      data: data,
      options: options,
    });
  }
}

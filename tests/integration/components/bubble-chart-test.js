import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';

module('Integration | Component | bubble-chart', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders the bubble chart', async function (assert) {
    const chartData = {
      datasets: [
        {
          data: [
            { x: 0, y: 0, r: 1 },
            { x: 1, y: 1, r: 2 },
            { x: 2, y: 2, r: 3 },
            { x: 3, y: 3, r: 4 },
          ],
          backgroundColor: [
            'rgba(255, 0, 0, 1)',
            'rgba(255, 0, 0, 0.8)',
            'rgba(255, 0, 0, 0.6)',
            'rgba(255, 0, 0, 0.4)',
          ],
        },
      ],
    };

    this.set('chartData', chartData);

    await render(hbs`<BubbleChart @chartData={{this.chartData}} />`);

    assert.ok(this.element.querySelector('canvas'), 'The chart was rendered');
  });
});

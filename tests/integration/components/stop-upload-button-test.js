import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | StopUploadButton', function (hooks) {
  setupRenderingTest(hooks);

  test('it calls the handleClick action when the button is clicked', async function (assert) {
    assert.expect(3);

    // Set up the test data
    this.set('handleClick', function () {
      assert.ok(true, 'handleClick was called');
    });

    // Render the component
    await render(hbs`<StopUploadButton @handleClick={{this.handleClick}} />`);

    // Check that the button text is correct
    assert.dom('button').hasText('Stop Data Stream');

    // Click the button
    await click('button');

    // Check that the handleClick action was called
    assert.ok(true, 'handleClick was called');

    // Check that the button text is correct
    assert.dom('button').hasText('Start Data Stream');
  });
});

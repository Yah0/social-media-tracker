import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | social-posts-counter', function (hooks) {
  setupRenderingTest(hooks);

  test('it displays the number of social posts', async function (assert) {
    // Set up the test data
    const upfluenceStreamStub = {
      socialPostsCounter: 10,
    };
    this.owner.register('service:upfluence-stream', upfluenceStreamStub, {
      instantiate: false,
    });

    // Render the component
    await render(hbs`<SocialPostsCounter />`);

    // Check that the number of social posts is displayed correctly
    assert.dom('p').hasText('Number of social posts on the chart: 10');
  });
});

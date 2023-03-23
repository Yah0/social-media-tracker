import { module, test } from 'qunit';
import { setupRenderingTest } from 'social-media-tracker/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | stop-upload-button', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<StopUploadButton />`);

    assert.dom(this.element).hasText('');

    // Template block usage:
    await render(hbs`
      <StopUploadButton>
        template block text
      </StopUploadButton>
    `);

    assert.dom(this.element).hasText('template block text');
  });
});

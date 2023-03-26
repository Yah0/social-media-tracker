import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Service | upfluence-stream', function (hooks) {
  setupTest(hooks);

  hooks.beforeEach(function () {
    this.service = this.owner.lookup('service:upfluence-stream');
  });

  test('setupEventSource initializes event source and sets isStreaming to true', function (assert) {
    assert.expect(2);

    this.service.setupEventSource();

    assert.ok(this.service.eventSource instanceof EventSource, 'event source is initialized');
    assert.ok(this.service.isStreaming, 'isStreaming is set to true');
  });

  test('handleMessageEvent adds social posts to the socialPosts array', function (assert) {
    assert.expect(1);

    const socialPost = {
      id: 'abc123',
      timestamp: Date.now(),
    };
    const data = JSON.stringify({
      tweet: socialPost,
    });
    const event = { data };

    this.service.handleMessageEvent(event);

    assert.deepEqual(this.service.socialPosts, [socialPost], 'social post is added to socialPosts array');
  });

  test('handleMessageEvent does not add social post to the socialPosts array when data is invalid', function (assert) {
    assert.expect(1);

    const data = 'invalid data';
    const event = { data };

    this.service.handleMessageEvent(event);

    assert.deepEqual(this.service.socialPosts, [], 'social post is not added to socialPosts array');
  });

  test('handleErrorEvent logs an error to the console', function (assert) {
    assert.expect(1);

    const error = 'some error';
    const event = { error };
    const consoleError = console.error;

    console.error = (msg) => {
      assert.strictEqual(msg, 'Error receiving streaming data', 'error is logged to the console');
    };

    this.service.handleErrorEvent(event);

    console.error = consoleError;
  });
});
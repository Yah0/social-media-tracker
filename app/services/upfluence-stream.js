/* eslint-disable ember/classic-decorator-hooks */
/* eslint-disable prettier/prettier */
import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import Evented from '@ember/object/evented';

export default class UpfluenceStreamService extends Service.extend(Evented) {
  @tracked socialPosts;

  eventSource = null;

  init() {
    super.init(...arguments);

    this.socialPosts = [];

    this.eventSource = new EventSource('https://stream.upfluence.co/stream');

    this.eventSource.addEventListener('message', (event) => {
      const { data } = event;
      try {
        const { pin, instagram_media, youtube_video, article, tweet, facebook_status } = JSON.parse(data);
        if (pin && pin.timestamp) {
          this.addSocialPost(pin.timestamp);
        }
        if (instagram_media && instagram_media.timestamp) {
          this.addSocialPost(instagram_media.timestamp);
        }
        if (youtube_video && youtube_video.timestamp) {
          this.addSocialPost(youtube_video.timestamp);
        }
        if (article && article.timestamp) {
          this.addSocialPost(article.timestamp);
        }
        if (tweet && tweet.timestamp) {
          this.addSocialPost(tweet.timestamp);
        }
        if (facebook_status && facebook_status.timestamp) {
          this.addSocialPost(facebook_status.timestamp);
        }
      } catch (e) {
        console.error('Error parsing streaming data', e);
      }
    });

    this.eventSource.addEventListener('error', (event) => {
      console.error('Error receiving streaming data', event);
    });
  }

  addSocialPost(timestamp) {
    const socialPost = { timestamp };
    this.socialPosts = [socialPost, ...this.socialPosts];
    this.trigger('newSocialPost', socialPost);
  }
}

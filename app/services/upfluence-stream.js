import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import Evented from '@ember/object/evented';

export default class UpfluenceStreamService extends Service.extend(Evented) {
  @tracked socialPosts = [];
  @tracked socialPostsCounter = 0;

  eventSource = null;

  constructor() {
    super(...arguments);

    this.socialPosts = [];

    this.eventSource = new EventSource('https://stream.upfluence.co/stream');

    this.eventSource.addEventListener('message', (event) => {
      const { data } = event;
      try {
        const {
          pin,
          instagram_media,
          youtube_video,
          article,
          tweet,
          facebook_status,
        } = JSON.parse(data);
        if (pin && pin.timestamp && pin.id) {
          this.addSocialPost({ id: pin.id, timestamp: pin.timestamp });
        }
        if (
          instagram_media &&
          instagram_media.timestamp &&
          instagram_media.id
        ) {
          this.addSocialPost({
            id: instagram_media.id,
            timestamp: instagram_media.timestamp,
          });
        }
        if (youtube_video && youtube_video.timestamp && youtube_video.id) {
          this.addSocialPost({
            id: youtube_video.id,
            timestamp: youtube_video.timestamp,
          });
        }
        if (article && article.timestamp && article.id) {
          this.addSocialPost({ id: article.id, timestamp: article.timestamp });
        }
        if (tweet && tweet.timestamp && tweet.id) {
          this.addSocialPost({ id: tweet.id, timestamp: tweet.timestamp });
        }
        if (
          facebook_status &&
          facebook_status.timestamp &&
          facebook_status.id
        ) {
          this.addSocialPost({
            id: facebook_status.id,
            timestamp: facebook_status.timestamp,
          });
        }
      } catch (e) {
        console.error('Error parsing streaming data', e);
      }
    });

    this.eventSource.addEventListener('error', (event) => {
      console.error('Error receiving streaming data', event);
    });
  }

  addSocialPost({ id, timestamp }) {
    const socialPost = { id, timestamp };
    this.socialPosts = [socialPost, ...this.socialPosts];
    this.socialPostsCounter++;
  }
}

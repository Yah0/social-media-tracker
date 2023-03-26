import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class StopUploadButtonComponent extends Component {
  @service upfluenceStream;
  @tracked isStreaming = true;

  @action
  handleClick() {
    if (this.isStreaming) {
      this.upfluenceStream.eventSource.close();
      this.isStreaming = false;
      this.upfluenceStream.isStreaming = false;
    } else {
      this.upfluenceStream.setupEventSource();
      this.isStreaming = true;
    }
  }
}

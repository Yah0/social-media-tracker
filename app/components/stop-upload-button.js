import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class StopUploadButtonComponent extends Component {
  @service upfluenceStream;
  @tracked isStreaming = true;

  @action
  handleClick() {
    this.upfluenceStream.eventSource.close();
    this.isStreaming = false;
  }
}

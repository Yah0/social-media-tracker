import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class StopUploadButtonComponent extends Component {
  @service upfluenceStream;

  @action
  handleClick() {
    console.log(this.upfluenceStream);
    this.upfluenceStream.eventSource.close();
  }
}

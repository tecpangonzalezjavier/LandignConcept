import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class ErrorMessageComponent {
  @Input() message: string = 'la información';
  @Input() type: 'info' | 'warning' | 'error' = 'info';

  get messageClass() {
    switch (this.type) {
      case 'warning':
        return 'message-warning';
      case 'error':
        return 'message-error';
      default:
        return 'message-info';
    }
  }

  constructor() { }
}

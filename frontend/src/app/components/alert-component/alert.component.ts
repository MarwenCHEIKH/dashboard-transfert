import { Component, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-alert-component',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
})
export class AlertComponent {
  @Input() title: string = 'Alert';
  @Input() message: string = 'Are you sure?';
  constructor(public bsModalRef: BsModalRef) {}
  confirm(): void {
    this.bsModalRef.hide();
    // Add your confirm logic here
  }
}

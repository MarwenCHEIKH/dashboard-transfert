import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  @Input()
  pageTitle!: string;
  @Output() linkClicked: EventEmitter<string> = new EventEmitter<string>();

  onLinkClick(linkTitle: string) {
    this.linkClicked.emit(linkTitle);
  }
}

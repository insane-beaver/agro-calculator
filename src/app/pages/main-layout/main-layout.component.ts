import { Component } from '@angular/core';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.sass']
})
export class MainLayoutComponent {

  isOpened = false;
  readonly year = new Date().getFullYear();

  toggleOverlay(): void {
    this.isOpened = !this.isOpened;
  }

  closeOverlay(): void {
    this.isOpened = false;
  }

}

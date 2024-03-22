import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.sass']
})
export class MainLayoutComponent implements OnInit {

  constructor() {
  }

  isOpened = false;

  ngOnInit(): void {
  }

  toggleOverlay(options?: number): void {
    let button = document.getElementById('menu') as HTMLElement;
    let sidebar = document.getElementById('mySidebar') as HTMLElement;
    let sidebarContent = document.getElementById('sidebar-content') as HTMLElement;
    if(options==1) {
      if (this.isOpened) {
        button.classList.toggle('opened');
        button.setAttribute('aria-expanded', String(button.classList.contains('opened')));

        sidebar.style.width = '0px';
        sidebarContent.className = "sidebar-content-close"

        this.isOpened = false;
      }
    }
    else {
      button.classList.toggle('opened');
      button.setAttribute('aria-expanded', String(button.classList.contains('opened')));

      if (this.isOpened) {
        sidebar.style.width = '0px';
        sidebarContent.className = "sidebar-content-close"

        this.isOpened = false;
      }
      else {
        sidebar.style.width = '200px';
        sidebarContent.className = "sidebar-content-open"

        this.isOpened = true;
      }
    }
  }

}

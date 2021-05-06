import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import * as firebase from 'firebase/app';
import 'firebase/analytics'

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.sass']
})
export class MainPageComponent implements OnInit {

  bRows!: number;
  gp!: number;
  mp!: number;
  d!: number;
  numbOnM!: number;
  isCounted: boolean = false
  analytics;

  constructor() {
    this.analytics = firebase.default.analytics();
  }

  ngOnInit(): void {
  }

  calculate(form: NgForm): void {
    this.analytics.logEvent(form);
    this.bRows = form.value.bRows;
    this.gp = form.value.gp;

    if(!((this.bRows<1)&&(this.gp<1))) {
      this.mp = +(100 / this.bRows).toFixed(3);
      this.d = +(1000000 / this.gp * this.mp).toFixed(3);
      this.numbOnM = +(100 / this.d).toFixed(3);
      this.isCounted = true;
    }
  }

}

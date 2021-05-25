import { Component, OnInit } from '@angular/core';
import firebase from 'firebase/app';
import {NgForm, NgModel} from '@angular/forms';

@Component({
  selector: 'app-reverse-calc',
  templateUrl: './reverse-calc.component.html',
  styleUrls: ['./reverse-calc.component.sass']
})
export class ReverseCalcComponent implements OnInit {

  bRows!: number;
  ob!: string;
  nr!: string;
  gp!: string
  mp!: number;
  isCounted: boolean = false
  analytics;

  constructor() {
    this.analytics = firebase.analytics();
  }

  ngOnInit(): void {
  }

  calculate(form: NgForm): void {
    this.analytics.logEvent(form);
    this.bRows = form.value.bRows;
    this.ob = this.replaceSpaces(form.value.ob);
    this.nr = this.replaceSpaces(form.value.nr);

    if(!((this.bRows<1)&&(Number(this.ob)<1)&&(Number(this.nr)<1))) {
      this.mp = +(100 / this.bRows).toFixed(3);
      let gp = +(this.mp*Number(this.nr)/Number(this.ob)*10000).toFixed(3);

      this.isCounted = true;
      this.ob = (this.ob).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
      this.nr = (this.nr).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
      this.gp = (gp+'').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
    }
  }

  obData(input: NgModel) {
    this.ob = (this.replaceSpaces(input.viewModel+'')).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
  }

  nrData(input: NgModel) {
    this.nr = (this.replaceSpaces(input.viewModel+'')).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
  }

  replaceSpaces(input: string) {
    let arr: string[] = (input).split('');
    arr.forEach(element => {
      if(element == ' ') arr.splice(arr.indexOf(element),1);
    });
    return arr.join('');
  }

}

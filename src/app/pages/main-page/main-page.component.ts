import { Component, OnInit } from '@angular/core';
import {NgForm, NgModel} from '@angular/forms';
import firebase from 'firebase/app';
import 'firebase/analytics'

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.sass']
})
export class MainPageComponent implements OnInit {

  bRows!: number;
  gp!: string;
  mp!: number;
  d!: number;
  numbOnM!: number;
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
    this.gp = this.replaceSpaces(form.value.gp);

    if(!((this.bRows<1)&&(Number(this.gp)<1))) {
      this.mp = +(100 / this.bRows).toFixed(3);
      this.d = +(1000000 / Number(this.gp) * this.mp).toFixed(3);
      this.numbOnM = +(100 / this.d).toFixed(3);

      this.isCounted = true;
      this.gp = (this.gp).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
    }
  }

  gpData(input: NgModel) {
    this.gp = (this.replaceSpaces(input.viewModel+'')).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
  }

  replaceSpaces(input: string) {
    let arr: string[] = (input).split('');
    arr.forEach(element => {
      if(element == ' ') arr.splice(arr.indexOf(element),1);
    });
    return arr.join('');
  }

}

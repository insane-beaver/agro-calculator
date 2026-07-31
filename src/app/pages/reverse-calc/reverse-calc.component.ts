import { Component } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { calcSeedingRate, round } from '../../shared/agro-calc';
import { formatInput, formatNumber, parseNumber } from '../../shared/number-format';

@Component({
  selector: 'app-reverse-calc',
  templateUrl: './reverse-calc.component.html',
  styleUrls: ['./reverse-calc.component.sass']
})
export class ReverseCalcComponent {

  bRows!: number;
  /** Облікова відстань уздовж рядка, метри. */
  ob!: string;
  /** Кількість рослин, порахованих на обліковій відстані. */
  nr!: string;
  gp!: string;
  mp!: number;
  numbOnM!: number;
  isCounted = false;
  error = '';

  calculate(form: NgForm): void {
    const rowSpacing = parseNumber(form.value.bRows);
    const countedLengthM = parseNumber(form.value.ob);
    const plantsCounted = parseNumber(form.value.nr);

    if (!(rowSpacing > 0) || !(countedLengthM > 0) || !(plantsCounted > 0)) {
      this.isCounted = false;
      this.error = 'Усі поля мають бути числами, більшими за нуль.';
      return;
    }

    const result = calcSeedingRate(rowSpacing, countedLengthM, plantsCounted);

    this.error = '';
    this.bRows = rowSpacing;
    this.mp = round(result.metersPerSquare);
    this.numbOnM = round(result.seedsPerMeter);
    this.gp = formatNumber(round(result.seedsPerHectare));
    this.ob = formatNumber(countedLengthM);
    this.nr = formatNumber(plantsCounted);
    this.isCounted = true;
  }

  obData(input: NgModel): void {
    this.ob = formatInput(input.viewModel);
  }

  nrData(input: NgModel): void {
    this.nr = formatInput(input.viewModel);
  }

}

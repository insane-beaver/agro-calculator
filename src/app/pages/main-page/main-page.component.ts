import { Component } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { calcSeedSpacing, round } from '../../shared/agro-calc';
import { formatInput, formatNumber, parseNumber } from '../../shared/number-format';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.sass']
})
export class MainPageComponent {

  bRows!: number;
  gp!: string;
  mp!: number;
  d!: number;
  numbOnM!: number;
  isCounted = false;
  error = '';

  calculate(form: NgForm): void {
    const rowSpacing = parseNumber(form.value.bRows);
    const seedsPerHectare = parseNumber(form.value.gp);

    if (!(rowSpacing > 0) || !(seedsPerHectare > 0)) {
      this.isCounted = false;
      this.error = 'Міжряддя та норма висіву мають бути числами, більшими за нуль.';
      return;
    }

    const result = calcSeedSpacing(rowSpacing, seedsPerHectare);

    this.error = '';
    this.bRows = rowSpacing;
    this.mp = round(result.metersPerSquare);
    this.d = round(result.distanceCm);
    this.numbOnM = round(result.seedsPerMeter);
    this.gp = formatNumber(seedsPerHectare);
    this.isCounted = true;
  }

  gpData(input: NgModel): void {
    this.gp = formatInput(input.viewModel);
  }

}

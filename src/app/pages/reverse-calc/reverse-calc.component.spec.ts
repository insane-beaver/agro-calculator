import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, NgForm } from '@angular/forms';

import { ReverseCalcComponent } from './reverse-calc.component';

describe('ReverseCalcComponent', () => {
  let component: ReverseCalcComponent;
  let fixture: ComponentFixture<ReverseCalcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [ReverseCalcComponent]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReverseCalcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('рахує густоту з облікової відстані в метрах', () => {
    // 56 рослин на 10 м рядка при міжрядді 70 см -> 80 000 шт/га
    component.calculate({ value: { bRows: 70, ob: '10', nr: '56' } } as NgForm);

    expect(component.isCounted).toBe(true);
    expect(component.numbOnM).toBe(5.6);
    expect(component.gp).toBe('80 000');
  });

  it('є зворотним до основного калькулятора', () => {
    component.calculate({ value: { bRows: 70, ob: '1', nr: '5,6' } } as NgForm);

    expect(component.gp).toBe('80 000');
  });

  it('не рахує при нулі або нечисловому вводі', () => {
    component.calculate({ value: { bRows: 70, ob: '0', nr: '56' } } as NgForm);
    expect(component.isCounted).toBe(false);
    expect(component.error).toBeTruthy();

    component.calculate({ value: { bRows: 70, ob: '10', nr: '' } } as NgForm);
    expect(component.isCounted).toBe(false);
  });
});

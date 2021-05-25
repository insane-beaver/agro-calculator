import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReverseCalcComponent } from './reverse-calc.component';

describe('ReverseCalcComponent', () => {
  let component: ReverseCalcComponent;
  let fixture: ComponentFixture<ReverseCalcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReverseCalcComponent ]
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
});

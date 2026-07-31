import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, NgForm } from '@angular/forms';

import { MainPageComponent } from './main-page.component';

describe('MainPageComponent', () => {
  let component: MainPageComponent;
  let fixture: ComponentFixture<MainPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [MainPageComponent]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('рахує відстань між насінинами', () => {
    component.calculate({ value: { bRows: 70, gp: '80 000' } } as NgForm);

    expect(component.isCounted).toBe(true);
    expect(component.error).toBe('');
    expect(component.d).toBe(17.857);
    expect(component.numbOnM).toBe(5.6);
  });

  it('не рахує при нулі або нечисловому вводі', () => {
    component.calculate({ value: { bRows: 70, gp: '0' } } as NgForm);
    expect(component.isCounted).toBe(false);
    expect(component.error).toBeTruthy();

    component.calculate({ value: { bRows: 0, gp: '80000' } } as NgForm);
    expect(component.isCounted).toBe(false);

    component.calculate({ value: { bRows: 70, gp: 'abc' } } as NgForm);
    expect(component.isCounted).toBe(false);
  });
});

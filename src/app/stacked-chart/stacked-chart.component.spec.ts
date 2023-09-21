import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StackedChartComponent } from './stacked-chart.component';

describe('StackedChartComponent', () => {
  let component: StackedChartComponent;
  let fixture: ComponentFixture<StackedChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StackedChartComponent]
    });
    fixture = TestBed.createComponent(StackedChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

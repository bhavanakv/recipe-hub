import { Component } from '@angular/core';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-meter',
  templateUrl: './meter.component.html',
  styleUrls: ['./meter.component.css']
})
export class MeterComponent {

  meter: any;

  createChart() {

  }

  ngOnInit(): void {
    this.createChart();
  }
}

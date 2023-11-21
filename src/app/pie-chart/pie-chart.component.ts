import { Component, Input, SimpleChanges } from '@angular/core';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})


export class PieChartComponent {
  chart: any;
  @Input() labels: string[] = [];
  @Input() data: number[] = [];

  /* 
    Function to create pie chart using the labels and data passed
  */
  createChart() {
    const colors: string[] = ['#EC7063', '#7DCEA0', 'orange', 'pink', 'blue', 'yellow', 'violet'];
    let colorsToFill: string[] = colors.slice(0,this.data.length);
    this.chart = new Chart("nutritionChart", {
      type: 'pie', 
      data: {
        labels: this.labels,
        datasets: [{
          data: this.data,
          backgroundColor: colorsToFill,
          hoverOffset: 4
        }],
      },
      options: {
        aspectRatio: 2
      }

    });
  }

  ngOnInit(): void {
  }

  // Function executed when there is a change in labels
  ngOnChanges(changes: SimpleChanges) {
    if (changes['labels'] && !changes['labels']['firstChange']) {
      this.createChart();
    }
  }
}

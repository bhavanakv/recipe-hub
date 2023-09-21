import { Component } from '@angular/core';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-stacked-chart',
  templateUrl: './stacked-chart.component.html',
  styleUrls: ['./stacked-chart.component.css']
})
export class StackedChartComponent {

  stackedChart: any;

  createChart() {
    this.stackedChart = new Chart("compositionChart", {
      type: 'bar',
      data: {
        labels: ["bike"],
        datasets: [{
          label: 'worst',
          backgroundColor: "blue",
          data: [17],
        }, {
          label: 'Okay',
          backgroundColor: "green",
          data: [14],
        }, {
          label: 'bad',
          backgroundColor: "red",
          data: [2],
        }],
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Stacked Bar chart for pollution status'
          },
        },
        aspectRatio: 8,
        indexAxis: 'y',
        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true
          }
        }
      }
    });
  }

  ngOnInit(): void {
    this.createChart();
  }
}

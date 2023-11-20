import { Component, Input, SimpleChanges } from '@angular/core';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-stacked-chart',
  templateUrl: './stacked-chart.component.html',
  styleUrls: ['./stacked-chart.component.css']
})
export class StackedChartComponent {

  stackedChart: any;
  @Input() labels: string[] = [];
  @Input() data: number[] = [];

  /* 
    Function to create stacked bar chart using the labels and data passed
  */
  createChart() {
    let dataset: any[] = [];
    const backgroundColors: string[] = ['pink', 'purple', 'yellow', 'blue','red', 'green', 'orange', ];
    let i = 0;

    // Creating dataset array needed for the chart
    this.labels.forEach(element => {
      dataset[i] = {
        label: element,
        backgroundColor: backgroundColors[i],
        data: [this.data[i]]
      }
      i++;
    });

    this.stackedChart = new Chart("compositionChart", {
      type: 'bar',
      data: {
        labels: ["% of components"],
        datasets: dataset,
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Percentage of ingredients'
          },
        },
        aspectRatio: 1.75,
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
  }

  // Function executed when there are changes in labels
  ngOnChanges(changes: SimpleChanges) {
    if (changes['labels'] && !changes['labels']['firstChange']) {
      this.createChart();
    }
  }
}

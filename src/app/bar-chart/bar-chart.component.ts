import { Component, Input, SimpleChanges } from '@angular/core';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})

export class BarChartComponent {
  barChart: any;
  @Input() labels: string[] = [];
  @Input() data: number[] = [];

  /* 
    Function to create a bar chart using the labels and the data passed
  */
  createChart(){
      this.barChart = new Chart("barChart", {
      type: 'bar', 
      data: {
        labels: this.labels, // Labels from recipe detail page
        datasets: [
          {
            label: "Recipe cost in dollars",
            data: this.data, // Data from recipe detail page
            backgroundColor: '#D7BDE2'
          }  
        ] 
      },
      options: {
        aspectRatio: 2.2
      }
    });
  }

  ngOnInit(): void{
  }

  // Function executed when the labels are populated
  ngOnChanges(changes: SimpleChanges) {
    if (changes['labels'] && !changes['labels']['firstChange']) {
      this.createChart();
    }
  }
}

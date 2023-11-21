import { Component, Input } from '@angular/core';
import { Chart } from 'chart.js/auto';


@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css']
})
export class ProgressBarComponent {

  progressChart: any;
  //@Input() prepTime: number = 0;
  //@Input() cookingTime: number = 0;

  createChart() {
    const labels = "Timeline";
    const prepTime = 20;
    const cookingTime = 30;
    this.progressChart = new Chart("timelineChart", {
      type: 'line',
      data: {
        labels: ["Total time"],
        datasets: [
          {
            label: 'Preparation time',
            data: [{ x: 0, y: 0 }, { x: prepTime, y: 1 }],
            backgroundColor: "#B4C95D",
            borderColor: "#B4C95D",
            borderWidth: 7,
            pointRadius: 0
          },
          {
            label: 'Cooking time',
            data: [{ x: prepTime, y: 1 }, { x: prepTime+cookingTime, y: 1}],
            backgroundColor: "#2A228F",
            borderColor: "#2A228F",
            borderWidth: 7,
            pointRadius: 0
          },
        ]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        aspectRatio: 4,
        plugins: {
          legend: {
            position: 'top',
          }
        }
      }
    });
  }

  ngOnInit() {
    this.createChart();
  }
}

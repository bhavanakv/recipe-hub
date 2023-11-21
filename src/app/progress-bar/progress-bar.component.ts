import { Component, Input, SimpleChanges } from '@angular/core';
import { Chart } from 'chart.js/auto';


@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css']
})
export class ProgressBarComponent {

  progressChart: any;
  @Input() prepTime: number = 0;
  @Input() cookingTime: number = 0;

  createChart() {
    const labels = "Timeline";
    console.log(this.prepTime);
    this.progressChart = new Chart("timelineChart", {
      type: 'line',
      data: {
        labels: ["Total time"],
        datasets: [
          {
            label: 'Preparation time',
            data: [{ x: 0, y: 0 }, { x: this.prepTime, y: 1 }],
            backgroundColor: "#F9E79F",
            borderColor: "#F9E79F",
            borderWidth: 7,
            pointRadius: 0
          },
          {
            label: 'Cooking time',
            data: [{ x: this.prepTime, y: 1 }, { x: this.prepTime+this.cookingTime, y: 1}],
            backgroundColor: "#A9CCE3",
            borderColor: "#A9CCE3",
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
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['prepTime'] && changes['cookingTime'] && !changes['prepTime']['firstChange'] && !changes['cookingTime']['firstChange']) {
      this.createChart();
    }
  }
}

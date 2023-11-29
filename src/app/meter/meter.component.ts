import { Component, SimpleChanges, Input } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { every } from 'rxjs';

@Component({
  selector: 'app-meter',
  templateUrl: './meter.component.html',
  styleUrls: ['./meter.component.css']
})
export class MeterComponent {

  @Input() difficulty: number = 1;
  meter: any;
  difficultyNeedle?: HTMLElement | null;

  /* 
    Function to create the gauge chart to display difficulty level
  */
  createChart() {
    this.meter = new Chart("difficultyMeter", {
      // Fixed chart to denote difficulty meter
      type: 'doughnut',
      data: {
        labels: ["Easy","Intermediate","Difficult",],
        datasets: [
          {
            label: 'Difficulty level',
            data: [1, 1, 1],
            backgroundColor: [
              'rgb(80, 200, 120)',
              'rgb(255, 205, 86)',
              'rgb(255, 99, 132)'
            ],
            circumference: 180, // For Semi-circular structure
            rotation: 270  // For rotation of object to required position        
          }]
      },
      options: {
        aspectRatio: 3.5,
        plugins: {
          legend: {
            position: 'top',
          }
        }
      },
    });
    
  }

  ngOnInit(): void {
    this.createChart();
    if(document.getElementById('difficultyNeedle') != null){
      this.difficultyNeedle = document.getElementById('difficultyNeedle');
    }
    // Adding the needle to meter
    this.updateDifficultyNeedle();
  }

  /* 
    Function executed when difficulty parameter is obtained as input
  */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['difficulty']) {
      this.updateDifficultyNeedle();
    }
  }

  /* 
    Function to display needle according to the difficulty level
  */
  updateDifficultyNeedle() {
    // Calculation the angle of the needle to be displayed
    const rotationAngle = ((this.difficulty - 1) / 2) * Math.PI - Math.PI/2;
    // Rotating the needle based on the angle
    if(this.difficultyNeedle) {
      this.difficultyNeedle.style.transform = `rotate(${rotationAngle}rad)`;
    }
  }
}

import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit {
  @Input() type: string = '';
  @Input() message: string = '';
  showAlert: boolean = false;
  alertClasses: string = '';

  ngOnInit() {
    // Initially, show the alert
    this.showAlert = true; 
    // Hide the alert after 2 seconds
    setTimeout(() => {
      this.showAlert = false; 
    }, 2000);
  }
}
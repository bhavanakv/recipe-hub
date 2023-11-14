import { Component, NgZone } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent {

  constructor(private ngZone: NgZone) {}

  alertMessage: string = '';
  showAlert = false;
  sleep() {
    for(let i=0;i<10000;i++) {
      console.log(i);
    }
  }
  onSubmit() {
    this.alertMessage = "You have successfully registered!"
    this.showAlert = true;
    setTimeout(() => {
      this.showAlert = false;
    }, 10000)
    }     
}

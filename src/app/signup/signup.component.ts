import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent {

  errorToast: boolean = false;
  successToast: boolean = false;
 
  constructor(private router: Router) {}

  alertMessage: string = '';

  /*
    Function to display error alert
    @param: Message to be displayed on the alert
  */ 
  displayErrorToast(message: string) {
    this.alertMessage = message;
    this.errorToast = true;
    setTimeout(() => {
      this.successToast = false;
      this.errorToast = false;
    }, 2000);
  }

  /* 
    Function to check if email is in valid format or not.
    @param: Email address to be verified
  */
  checkEmailFormat(email: string) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const isEmailValid = emailRegex.test(email);
    return isEmailValid;
  }

  /*
    Function to check if the username is existing or not.
    @param: Username to be verified
  */
  checkExistingUsers(username: string) {
    // dummy users 
    const users: string[] = ['bhavana', 'teja', 'john'];
    return users.includes(username);
  }

  /* 
    Function to execute signup. If all details are valid, then user account is created or error details are displayed.
    @param: Email, username and password of the user
  */
  onSubmit(email: string, username: string, password: string) {
      let flag: boolean = false;
      // Checking if all necessary details are entered or not
      if(email == '') {
        this.displayErrorToast('Email is missing. Please enter the email address');
      }
      else if(username == '') {
        this.displayErrorToast('Username is missing. Please enter the username');
      }
      else if(password == '') {
        this.displayErrorToast('Password is missing. Please enter the password');
      }
      else {
        // Checking if the user is existing or not. If yes, then error is displayed
        if(this.checkExistingUsers(username)) {
          this.displayErrorToast("Existing username. Please try some other username.");
        }
        else {
          // Checking if the email address entered is valid or not. If not, error is displayed
          // If signup is successful, then login page is opened.
          if(this.checkEmailFormat(email)) {
            this.successToast = true;
            this.alertMessage = 'You have successfully registered! Navigating to login.'
            setTimeout(() => {
              this.errorToast = false;
              this.successToast = false;
              this.router.navigate(['/login']);
            },2000);
          }
          else { 
            this.displayErrorToast('Invalid email address. Please try again');  
          }
        }
      }
    }     
}

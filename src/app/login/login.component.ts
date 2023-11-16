import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username:string;
  errorToast: boolean;
  successToast: boolean;

  constructor(private router: Router, public timer: RecipeService) {
    this.username = "";
    this.errorToast = false;
    this.successToast = false;
  }

  /*
    Function that executes login. If the username and password entered are correct, then it returns home page otherwise error message is displayed.
    @param: username and password
  */
  onSubmit(name: string, password: string) {
    console.log("Submit called")

    // Validating if username and password are entered or not
    if(name == '' || password == '') {
      this.errorToast = true;
      setTimeout(() => {
        this.successToast = false;
        this.errorToast = false;
      }, 2000);
    }

    // Validating if the username and password entered are correct or not based on dummy data
    else {
      if(name == 'bhavana' && password == '123') {
        this.username = "Bhavana";
      }
      else if(name == 'john' && password == '123') {
        this.username = "John Doe";
      }
      else if(name == 'teja' && password == '123') {
        this.username = "Bhanutheja";
      }
      // If the credentials do not match, then display error message
      else {
        this.errorToast = true;
        setTimeout(() => {
          this.successToast = false;
          this.errorToast = false;
        }, 2000);
      }

      // If the credentials match, then display success message and navigate to home page
      if(!this.errorToast) {
        this.successToast = true;
        // Storing the username in localStorage to use in HomeComponent
        localStorage.clear();
        localStorage.setItem('username', this.username);
        setTimeout(() => {
          this.errorToast = false;
          this.successToast = false;
          this.router.navigate(['/home']);
        },2000);
      }  
    }
  }
}

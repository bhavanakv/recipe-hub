import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  showLogoutButton: boolean = false;
  showToast: boolean = false;
  showModal: boolean = false;
  display = "none";


  constructor(private router: Router) {

  }
  
  ngOnInit() {
    if(localStorage.hasOwnProperty("username")) {
      // Display logout button if the user is logged in
      this.showLogoutButton = true;
    }
  }

  confirmLogout(): void {
    // Removing the username if logged out
    localStorage.clear();
    // Reloading the page after logout is done
    setTimeout(() => {
      window.location.reload();
    });
  }
}

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
      this.showLogoutButton = true;
    }
  }

  confirmLogout(): void {
    localStorage.clear();
    setTimeout(() => {
      window.location.reload();
    });
  }
}

import { Component, Input } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service/auth.service';
@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
})
export class ToolbarComponent {
  constructor(private authservice: AuthService, private router: Router) {}

  logout() {
    this.authservice.logout();
  }
  isLoginOrRegisterRoute(): boolean {
    return (
      this.router.url.includes('/login') ||
      this.router.url.includes('/register')
    );
  }

  isLoggedIn(): boolean {
    return this.authservice.isLoggedIn();
  }
}

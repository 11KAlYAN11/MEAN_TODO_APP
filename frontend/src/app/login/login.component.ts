import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  error: string | null = null;

  constructor(private router: Router) {}

  handleLogin() {
    if (this.username === 'default' && this.password === 'default') {
      // Log in as guest user
      this.router.navigate(['/tasks']);
    } else {
      // Handle other user login (to be implemented)
      this.error = 'Invalid username or password';
    }
  }
}
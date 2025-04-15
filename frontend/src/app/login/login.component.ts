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

  async handleLogin() {
    try {
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: this.username,
          password: this.password
        })
      });

      if (response.ok) {
        const data = await response.json();
        this.router.navigate(['/tasks']);
      } else {
        this.error = 'Invalid username or password';
      }
    } catch (error) {
      this.error = 'Error logging in';
    }
  }
}
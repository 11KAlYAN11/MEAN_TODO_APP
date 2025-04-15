
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="register-container">
      <h2>Register</h2>
      <form (submit)="handleRegister()">
        <div class="form-group">
          <label for="username">Username</label>
          <input type="text" id="username" [(ngModel)]="username" name="username" required>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" [(ngModel)]="password" name="password" required>
        </div>
        <button type="submit">Register</button>
      </form>
      <div *ngIf="error" class="error">{{ error }}</div>
      <p>Already have an account? <a routerLink="/login">Login</a></p>
    </div>
  `,
  styles: [`
    .register-container {
      max-width: 400px;
      margin: 2rem auto;
      padding: 2rem;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
    .form-group {
      margin-bottom: 1rem;
    }
    .error {
      color: red;
      margin-top: 1rem;
    }
  `]
})
export class RegisterComponent {
  username: string = '';
  password: string = '';
  error: string | null = null;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {}

  handleRegister() {
    this.http.post('http://localhost:3000/api/auth/register', {
      username: this.username,
      password: this.password
    }).subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.error = err.error.message || 'Registration failed';
      }
    });
  }
}

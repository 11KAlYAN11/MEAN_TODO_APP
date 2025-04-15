
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="auth-container">
      <div class="auth-card">
        <h2>Create Account</h2>
        <p class="subtitle">Join us today!</p>
        
        <form (submit)="handleRegister()">
          <div class="form-group">
            <input type="text" id="username" [(ngModel)]="username" name="username" placeholder="Choose username" required>
          </div>
          <div class="form-group">
            <input type="password" id="password" [(ngModel)]="password" name="password" placeholder="Choose password" required>
          </div>
          <button type="submit" class="auth-button">Sign Up</button>
        </form>
        
        <div *ngIf="error" class="error">{{ error }}</div>
        <p class="auth-link">Already have an account? <a routerLink="/login">Login</a></p>
      </div>
    </div>
  `,
  styles: [`
    .auth-container {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 20px;
    }

    .auth-card {
      background: white;
      padding: 40px;
      border-radius: 20px;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
      width: 100%;
      max-width: 400px;
      text-align: center;
    }

    h2 {
      color: #2d3748;
      margin-bottom: 8px;
      font-size: 28px;
    }

    .subtitle {
      color: #718096;
      margin-bottom: 30px;
      font-size: 16px;
    }

    .form-group {
      margin-bottom: 20px;
    }

    input {
      width: 100%;
      padding: 12px 20px;
      border: 2px solid #e2e8f0;
      border-radius: 10px;
      font-size: 16px;
      transition: all 0.3s ease;
    }

    input:focus {
      border-color: #667eea;
      outline: none;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }

    .auth-button {
      width: 100%;
      padding: 12px;
      background: #667eea;
      color: white;
      border: none;
      border-radius: 10px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .auth-button:hover {
      background: #5a67d8;
      transform: translateY(-1px);
    }

    .error {
      color: #e53e3e;
      margin-top: 12px;
      font-size: 14px;
    }

    .auth-link {
      margin-top: 20px;
      color: #718096;
    }

    .auth-link a {
      color: #667eea;
      text-decoration: none;
      font-weight: 600;
    }

    .auth-link a:hover {
      text-decoration: underline;
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

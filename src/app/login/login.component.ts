import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service'; // Assuming AuthService handles the fetching and validation
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    // Optionally, load the patient data on init or ensure AuthService is ready
    this.authService.loadPatients();
  }

  login() {
    this.authService.validateLogin(this.username, this.password).subscribe({
      next: (isValid) => {
        if (isValid) {
          this.router.navigate(['/dashboard']);
        } else {
          alert('Invalid credentials');
        }
      },
      error: (err) => {
        console.error('Login failed:', err);
        alert('Login process encountered an error');
      }
    });
  }
}

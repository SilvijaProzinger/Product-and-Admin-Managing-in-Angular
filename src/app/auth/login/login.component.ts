import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(
            '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d{3,})(?=.*[-_@$!%*?&]{2,})[A-Za-z\\d\\-_@$!%*?&]{8,}$',
          ),
        ],
      ],
    });
  }

  async onSubmit(): Promise<void> {
    if (this.loginForm.valid) {
      try {
        await this.authService.login(
          this.loginForm.value.email,
          this.loginForm.value.password,
        );
        this.router.navigate(['/']);
      } catch (error) {
        this.error = 'Invalid login credentials';
      }
    }
  }
}

import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  errorMessage = '';

  loginForm;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {

    if (this.loginForm.invalid) {
      return;
    }

    const username = this.loginForm.value.username!;
    const password = this.loginForm.value.password!;

    this.authService.login(username, password).subscribe({

      next: response => {

        this.authService.saveToken(response.token);
        this.authService.saveRole(response.role);

        this.router.navigate(['/movies']);
      },

      error: () => {
        this.errorMessage = 'Pogrešno korisničko ime ili lozinka.';
      }

    });
  }
}

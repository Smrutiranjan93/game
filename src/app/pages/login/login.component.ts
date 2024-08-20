import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm: FormGroup;
  showPassword = false;
  isLoading = false;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: AuthService
  ) {
    this.loginForm = this.fb.group({
      identifier: ['', [Validators.required, this.identifierValidator]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  identifierValidator(control: any) {
    const emailPattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    const phonePattern = /^[0-9]{10}$/;
    if (emailPattern.test(control.value) || phonePattern.test(control.value)) {
      return null;
    } else {
      return { invalidIdentifier: true };
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  onLogin() {
    if (this.loginForm.valid) {
      this.isLoading = true;  // Show spinner
      const { identifier, password } = this.loginForm.value;
  
      let loginData: any = { password };
      console.log(identifier);
      console.log(loginData);
      if (/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(identifier)) {
        loginData.email = identifier;
      } else if (/^[0-9]{10}$/.test(identifier)) {
        loginData.phone = identifier;
      }
  
      this.auth.login(loginData).subscribe(
        (response:any) => {
          this.isLoading = false;  // Hide spinner
          console.log('Login successful:', response);
          const user = response.result.user;
          localStorage.setItem('user', JSON.stringify(user));
          this.router.navigate(['/user']);
        },
        (error) => {
          this.isLoading = false;  // Hide spinner
          console.error('Login failed:', error);
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }

  forgotPassword() {}
}

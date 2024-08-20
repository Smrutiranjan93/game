import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-user-register',
  standalone: true,
  imports: [CommonModule,RouterModule,FormsModule,ReactiveFormsModule],
  templateUrl: './user-register.component.html',
  styleUrl: './user-register.component.scss'
})
export class UserRegisterComponent {
  registrationForm: FormGroup;
  showPassword = false; 
  constructor(private fb: FormBuilder,private auth:AuthService) {
    this.registrationForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]]
    },{
      validator: this.passwordMatchValidator 
    });
  }


  onSubmit() {
    if (this.registrationForm.valid) {
      const { password, email, phone } = this.registrationForm.value;
      console.log(this.registrationForm.value)
      try {
        this.auth
          .register(this.registrationForm.value)
          .subscribe((response) => {
            console.log('Registration successful', response);
          }, (error) => {
            console.error('Registration failed', error);
          });
      } catch (error:any) {
        console.error(error.message);
      }
    } else {
      console.log('Form is not valid');
    }
  }
  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}

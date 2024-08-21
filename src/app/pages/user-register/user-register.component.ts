import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

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
  isLoading = false;
  constructor(private fb: FormBuilder,private router: Router,private auth:AuthService,private toastr: ToastrService) {
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
      this.isLoading = true; // Show spinner

      this.auth.register(this.registrationForm.value).subscribe(
        (response) => {
          this.isLoading = false; // Hide spinner
          console.log('Registration successful', response);
          this.toastr.success('Registration successful', 'Success');
          this.router.navigate(['/login']);
        },
        (error) => {
          this.isLoading = false; // Hide spinner
          console.error('Registration failed', error);
          this.toastr.error('Registration failed', 'Error');
        }
      );
    } else {
      console.log('Form is not valid');
      this.toastr.warning('Please fill out the form correctly', 'Form Invalid');
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

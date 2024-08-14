import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  selectedPlan: string | null = null;
  setOtp = false;
  setEmailOtp = false;
  verifyForm: FormGroup;
  emailVerifyForm: FormGroup;

  constructor(private fb: FormBuilder,private route: Router) {
    this.verifyForm = this.fb.group({
      mobileNumber: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{10}$')],
      ],
      otp1: ['', [Validators.required, Validators.maxLength(1)]],
      otp2: ['', [Validators.required, Validators.maxLength(1)]],
      otp3: ['', [Validators.required, Validators.maxLength(1)]],
      otp4: ['', [Validators.required, Validators.maxLength(1)]],
    });
    this.emailVerifyForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      emailOtp1: ['', [Validators.required, Validators.maxLength(1)]],
      emailOtp2: ['', [Validators.required, Validators.maxLength(1)]],
      emailOtp3: ['', [Validators.required, Validators.maxLength(1)]],
      emailOtp4: ['', [Validators.required, Validators.maxLength(1)]],
    });
  }
  planDetails: {
    [key: string]: Array<{ feature: string; description: string }>;
  } = {
    freelance: [
      { feature: 'Space', description: '1 GB of space' },
      { feature: 'Support', description: 'Support at $25/hour' },
      { feature: 'Cloud Access', description: 'Limited cloud access' },
    ],
    business: [
      { feature: 'Space', description: '5 GB of space' },
      { feature: 'Support', description: 'Support at $5/hour' },
      { feature: 'Cloud Access', description: 'Full cloud access' },
    ],
    enterprise: [
      { feature: 'Space', description: '10 GB of space' },
      { feature: 'Support', description: 'Support at $5/hour' },
      { feature: 'Cloud Access', description: 'Full cloud access' },
    ],
  };

  selectPlan(plan: string): void {
    this.selectedPlan = plan;
    // this.route.navigateByUrl('user/payment')
  }
  sendOtp() {
    if (this.verifyForm.controls['mobileNumber'].valid) {
      this.setOtp = true;
    } else {
      this.verifyForm.controls['mobileNumber'].markAsTouched();
    }
  }

  validateOtp() {
    const otp = this.verifyForm.value.otp1 + this.verifyForm.value.otp2 + this.verifyForm.value.otp3 + this.verifyForm.value.otp4;
    console.log('OTP entered:', otp);
  }
  sendEmailOtp() {
    if (this.emailVerifyForm.controls['email'].valid) {
      this.setEmailOtp = true;
      
    }
  }
  validateEmailOtp() {
    const otp = [
      this.emailVerifyForm.value.emailOtp1,
      this.emailVerifyForm.value.emailOtp2,
      this.emailVerifyForm.value.emailOtp3,
      this.emailVerifyForm.value.emailOtp4,
    ].join('');
    console.log(otp)
  }
}

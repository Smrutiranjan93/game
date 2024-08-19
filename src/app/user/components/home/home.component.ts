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
import { AuthService } from '../../../services/auth.service';

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
  otpVerifyForm: FormGroup;
  packages: any[] = [];
  constructor(
    private fb: FormBuilder,
    private route: Router,
    private auth: AuthService
  ) {
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
    });
    this.otpVerifyForm = this.fb.group({
      emailOtp1: ['', [Validators.required, Validators.maxLength(1)]],
      emailOtp2: ['', [Validators.required, Validators.maxLength(1)]],
      emailOtp3: ['', [Validators.required, Validators.maxLength(1)]],
      emailOtp4: ['', [Validators.required, Validators.maxLength(1)]],
    });
  }

  ngOnInit() {
    const storedMobileNumber = JSON.parse(
      localStorage.getItem('user') || '{}'
    ).phone;
    if (storedMobileNumber) {
      this.verifyForm.patchValue({ mobileNumber: storedMobileNumber });
    }
    const storedEmail = JSON.parse(localStorage.getItem('user') || '{}').email;
    if (storedEmail) {
      this.emailVerifyForm.patchValue({ email: storedEmail });
    }
    this.getPackages();
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
      const user_id = JSON.parse(localStorage.getItem('user') || '{}');
      const { phone } = this.verifyForm.value.mobileNumber;
      console.log(phone);
      console.log(this.verifyForm.value.mobileNumber);
      const otpData = {
        user_id: user_id.id,
        phone: this.verifyForm.value.mobileNumber,
      };
      console.log(otpData);
      this.auth.sendOtp(otpData).subscribe(
        (response: any) => {
          console.log('OTP verification successful:', response);

          // this.router.navigate(['/user']);
        },
        (error) => {
          console.error('OTP verification failed:', error);
        }
      );
    } else {
      this.verifyForm.controls['mobileNumber'].markAsTouched();
    }
  }

  validateOtp() {
    const otp =
      this.verifyForm.value.otp1 +
      this.verifyForm.value.otp2 +
      this.verifyForm.value.otp3 +
      this.verifyForm.value.otp4;
    console.log('OTP entered:', otp);
    console.log(otp);
    const user_id = JSON.parse(localStorage.getItem('user') || '{}');
    const { phone } = this.verifyForm.value.mobileNumber;

    const obj = {
      user_id: user_id.id,
      phone: this.verifyForm.value.mobileNumber,
      otp,
    };
    console.log(obj);
    this.auth.verifyEmailOtp(obj).subscribe((res: any) => {
      alert('verified successfully');
    });
  }

  sendEmailOtp() {
    if (this.emailVerifyForm.controls['email'].valid) {
      this.setEmailOtp = true;
    }
    console.log(this.emailVerifyForm.valid);
    if (this.emailVerifyForm.valid) {
      const user_id = JSON.parse(localStorage.getItem('user') || '{}');
      const { email } = this.emailVerifyForm.value;

      const otpData = {
        user_id: user_id.id,
        email,
        // phone: user_id.phone,
      };
      console.log(otpData);
      this.auth.sendOtp(otpData).subscribe(
        (response: any) => {
          console.log('OTP verification successful:', response);

          // this.router.navigate(['/user']);
        },
        (error) => {
          console.error('OTP verification failed:', error);
        }
      );
    }
  }

  validateEmailOtp() {
    const otp = [
      this.otpVerifyForm.value.emailOtp1,
      this.otpVerifyForm.value.emailOtp2,
      this.otpVerifyForm.value.emailOtp3,
      this.otpVerifyForm.value.emailOtp4,
    ].join('');
    console.log(otp);
    const user_id = JSON.parse(localStorage.getItem('user') || '{}');
    const { email } = this.emailVerifyForm.value;

    const obj = {
      user_id: user_id.id,
      email,
      otp,
    };
    this.auth.verifyEmailOtp(obj).subscribe((res: any) => {
      alert('verified successfully');
    });
  }

  getPackages() {
    this.auth.getPackages().subscribe((res: any) => {
      console.log(res);
      this.packages = res.result.list;
    });
  }
}

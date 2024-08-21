import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ToastrModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements AfterViewInit{
  selectedPlan: string | null = null;
  setOtp = false;
  setEmailOtp = false;
  verifyForm: FormGroup;
  emailVerifyForm: FormGroup;
  otpVerifyForm: FormGroup;
  packages: any[] = [];
  allPackages: any[][] = [];
  mobileVerify:boolean=true;
  emailVerify:boolean=true;
  @ViewChild('closeButton') closeButton!: ElementRef;
  @ViewChild('closeEmailButton') closeEmailButton!: ElementRef;
  planDetails:any;
  constructor(
    private fb: FormBuilder,
    private route: Router,
    private auth: AuthService,
    private toastr: ToastrService
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

  ngAfterViewInit() {
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
    const storedMobileVerifyNumber = JSON.parse(localStorage.getItem('phone_varify') || 'false');
    const storedEmailVerifyNumber = JSON.parse(localStorage.getItem('email_varify') || 'false');
    this.mobileVerify = storedMobileVerifyNumber;
    this.emailVerify = storedEmailVerifyNumber;
    console.log(this.mobileVerify);
    this.getPackages();
  }
 

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

    const user_id = JSON.parse(localStorage.getItem('user') || '{}');
    const obj = {
      user_id: user_id.id,
      phone: this.verifyForm.value.mobileNumber,
      otp,
    };
    console.log(obj);

    this.auth.verifyEmailOtp(obj).subscribe(
      (res: any) => {
        this.closeModal();

        this.toastr.success('Mobile Verified successfully !', 'Success');
      },
      (error) => {
        this.toastr.error('Mobile Verification failed !', 'Error');
      }
    );
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

    this.auth.verifyEmailOtp(obj).subscribe(
      (res: any) => {
        this.closeModal();
        this.toastr.success('Email Verified successfully !', 'Success');
      },
      (error: any) => {
        this.toastr.error('Email Verification failed !', 'Error');
      }
    );
  }
  closeModal() {
    this.closeButton.nativeElement.click(); 
    this.closeEmailButton.nativeElement.click(); 
  }
  getPackages(): void {
    this.auth.getPackages().subscribe((res: any) => {
      this.packages = res.result.list;
      this.allPackages = this.chunkArray(this.packages, 3);
    });
  }

  chunkArray(array: any[], size: number): any[][] {
    const results = [];
    for (let i = 0; i < array.length; i += size) {
      results.push(array.slice(i, i + size));
    }
    return results;
  }
}

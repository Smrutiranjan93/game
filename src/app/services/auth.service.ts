import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  PATH_OF_API = 'http://mnpl.world/admin/public/api';
  
  constructor(private httpClient: HttpClient) {}
  private loggedInSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  get isLoggedIn$(): Observable<boolean> {
    return this.loggedInSubject.asObservable();
  }

  logout() {
    this.loggedInSubject.next(false);
  }
  register(registerData: any) {
    const formData: any = new FormData();

    if (registerData.password) {
      formData.append('password', registerData.password);
    }
    if (registerData.email) {
      formData.append('email', registerData.email);
    }
    if (registerData.phone) {
      formData.append('phone', registerData.phone);
    }
    if (registerData.phone) {
      formData.append('name', registerData.name);
    }
    return this.httpClient.post(this.PATH_OF_API + '/registation', formData);
  }
  login(loginData: any) {
    const formData: any = new FormData();

    if (loginData.password) {
      formData.append('password', loginData.password);
    }
    if (loginData.email) {
      formData.append('email', loginData.email);
    }
    if (loginData.phone) {
      formData.append('phone', loginData.phone);
    }
    return this.httpClient.post(this.PATH_OF_API + '/login', formData);
  }
  sendOtp(obj:any){
    const formData: any = new FormData();

    if (obj.user_id) {
      formData.append('user_id', obj.user_id);
    }
    if (obj.email) {
      formData.append('email', obj.email);
    }
    if (obj.phone) {
      formData.append('phone', obj.phone);
    }
    return this.httpClient.post(this.PATH_OF_API+'/sendemailphoneotp',formData)
  }
  verifyEmailOtp(obj:any){
    const formData: any = new FormData();

    if (obj.user_id) {
      formData.append('user_id', obj.user_id);
    }
    if (obj.email) {
      formData.append('email', obj.email);
    }
    if (obj.phone) {
      formData.append('phone', obj.phone);
    }
    if (obj.otp) {
      formData.append('otp', obj.otp);
    }
    return this.httpClient.post(this.PATH_OF_API+'/varifyemailphone',formData)
  }
  getPackages(){
    return this.httpClient.post(this.PATH_OF_API+'/packagelist',null)
  }
}

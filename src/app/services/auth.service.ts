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
}

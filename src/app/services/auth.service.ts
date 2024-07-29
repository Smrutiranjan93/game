import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  private loggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  get isLoggedIn$(): Observable<boolean> {
    return this.loggedInSubject.asObservable();
  }

  login() {
    console.log(this.loggedInSubject)
    this.loggedInSubject.next(true);
  }

  logout() {
    this.loggedInSubject.next(false);
  }
}

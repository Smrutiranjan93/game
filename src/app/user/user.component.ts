import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
// import { SharedModule } from "../shared/shared.module";
import { AuthService } from '../services/auth.service';
import { FooterComponent } from "../shared/footer/footer.component";
import { SidenavComponent } from "../shared/sidenav/sidenav.component";
import { HeaderComponent } from '../shared/header/header.component';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [RouterModule, CommonModule, FooterComponent, SidenavComponent, HeaderComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {
  constructor(public authService: AuthService){}
  isLoggedIn: boolean = false;


  ngOnInit() {
    this.authService.isLoggedIn$.subscribe((loggedIn) => {
      console.log(loggedIn)
      this.isLoggedIn = loggedIn;
      console.log(this.isLoggedIn)
    });
  }
}

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterOutlet,CommonModule,RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{

  constructor() { }

  ngOnInit(): void {
    this.mobileNavToggle();
  }

  mobileNavToggle() {
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle') as HTMLElement;
    const navbar = document.querySelector('#navbar') as HTMLElement;
    if (mobileNavToggle && navbar) {
      mobileNavToggle.addEventListener('click', () => {
        navbar.classList.toggle('navbar-mobile');
        mobileNavToggle.classList.toggle('bi-list');
        mobileNavToggle.classList.toggle('bi-x');
      });

      const dropdowns = navbar.querySelectorAll('.dropdown > a');
      dropdowns.forEach(dropdown => {
        dropdown.addEventListener('click', (e) => {
          if (navbar.classList.contains('navbar-mobile')) {
            e.preventDefault();
            const nextElement = dropdown.nextElementSibling as HTMLElement;
            if (nextElement) {
              nextElement.classList.toggle('dropdown-active');
            }
          }
        });
      });
    }
  }
}

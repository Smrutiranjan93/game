import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
declare var bootstrap: any;

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor() { }

  ngOnInit(): void {
    // Ensure carousel initialization
    document.addEventListener('DOMContentLoaded', () => {
      const heroCarousel = document.querySelector('#heroCarousel');
      if (heroCarousel) {
        const carousel = new bootstrap.Carousel(heroCarousel);
      }
    });
  }
}

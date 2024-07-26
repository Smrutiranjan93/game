import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-spin',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './spin.component.html',
  styleUrl: './spin.component.scss'
})
export class SpinComponent {
  rotation = 0;

  spinWheel() {
    const sections = 8;
    const sectionDegree = 360 / sections;
    const minRotation = 360 * 10; // Ensure it spins at least 10 times
    const maxRotation = 360 * 15; // Up to 15 times

    // Random rotation ensuring different section
    const randomDegree = Math.floor(Math.random() * (maxRotation - minRotation + 1)) + minRotation;
    const extraRotation = Math.floor(Math.random() * sections) * sectionDegree;

    this.rotation = this.rotation + randomDegree + extraRotation;
  }
}

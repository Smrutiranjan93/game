import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-prize-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './prize-modal.component.html',
  styleUrl: './prize-modal.component.scss'
})
export class PrizeModalComponent {
  @Input() prize: number | null = null;

  close() {
    this.prize = null;
  }
}

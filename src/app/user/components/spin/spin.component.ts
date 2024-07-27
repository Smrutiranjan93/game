import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PrizeModalComponent } from "../prize-modal/prize-modal.component";

@Component({
  selector: 'app-spin',
  standalone: true,
  imports: [CommonModule, RouterModule, PrizeModalComponent],
  templateUrl: './spin.component.html',
  styleUrl: './spin.component.scss',
})
export class SpinComponent {
  @ViewChild('container') container!: ElementRef<HTMLDivElement>;
  prizes: number[] = [10, 20000, 50, 5000, 100, 250, 100000, 500, 1000, 2500, 10000, 50000];
  activeBtn: boolean = false;
  deg: number = 0;
  prize: number | null = null;

  spin() {
    this.activeBtn = true;
    setTimeout(() => (this.activeBtn = false), 5100);

    let spins = Math.floor(Math.random() * 7) + 9; // perform between 9 and 15 spins
    console.log('spins: ' + spins);

    let wheelAngle = Math.floor(Math.random() * 12) * 30; // set wheel angle rotation
    console.log('wheelAngle: ' + wheelAngle);

    let sectorAngle = Math.floor(Math.random() * 14) + 1; // set sector angle rotation
    sectorAngle *= Math.floor(Math.random() * 2) === 1 ? 1 : -1; // between -14deg and +14deg (28deg range of 30deg sector)
    console.log('sectorAngle: ' + sectorAngle);

    this.deg += 360 * spins + wheelAngle + sectorAngle;
    (this.container.nativeElement.querySelector('.inner') as HTMLElement).style.transform = `rotate(${this.deg}deg)`;

    setTimeout(() => (this.deg -= sectorAngle), 100); // reset sector angle rotation to avoid angle > +-44deg on next rotation

    let index = Math.floor((this.deg - sectorAngle) / 30) % 12; // get the prize
    console.log('prize index:' + index);
    this.prize = this.prizes[index];
    console.log('you will win: ' + this.prize);
  }
}

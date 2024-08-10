import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  selectedPlan: string | null = null;
  constructor(private route: Router) {}
  planDetails: {
    [key: string]: Array<{ feature: string; description: string }>;
  } = {
    basic: [
      { feature: 'Cameras', description: 'Includes 2 Cameras' },
      { feature: 'Cashback', description: 'Up to ₹25,000 Cashback' },
      { feature: 'Installation', description: 'Standard Installation' },
    ],
    standard: [
      { feature: 'Cameras', description: 'Includes 4 Cameras' },
      { feature: 'Cashback', description: 'Up to ₹50,000 Cashback' },
      { feature: 'Installation', description: 'Premium Installation' },
    ],
    premium: [
      { feature: 'Cameras', description: 'Includes 6 Cameras' },
      { feature: 'Cashback', description: 'Up to ₹100,000 Cashback' },
      { feature: 'Installation', description: 'Advanced Installation' },
    ],
    ultimate: [
      { feature: 'Cameras', description: 'Includes 8 Cameras' },
      { feature: 'Cashback', description: 'Up to ₹20,000 Cashback' },
      { feature: 'Installation', description: 'Complete Installation' },
    ],
    ultraPremium:[
      { feature: 'Cameras', description: 'Includes 15 Cameras' },
      { feature: 'Cashback', description: 'Up to ₹2,50,000 Cashback' },
      { feature: 'Installation', description: 'Complete Installation' },
    ],
    superSonic:[
      { feature: 'Cameras', description: 'Includes 35 Cameras' },
      { feature: 'Cashback', description: 'Up to ₹5,00,000 Cashback' },
      { feature: 'Installation', description: 'Complete Installation' },
    ]
  };

  selectPlan(plan: string): void {
    this.selectedPlan = plan;
    // this.route.navigateByUrl('user/payment')
  }
}

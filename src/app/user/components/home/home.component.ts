import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,RouterOutlet,FormsModule,ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  selectedPlan: string | null = null;
constructor(private route :Router){}
  planDetails: { [key: string]: Array<{ feature: string, description: string }> } = {
    freelance: [
      { feature: 'Space', description: '1 GB of space' },
      { feature: 'Support', description: 'Support at $25/hour' },
      { feature: 'Cloud Access', description: 'Limited cloud access' }
    ],
    business: [
      { feature: 'Space', description: '5 GB of space' },
      { feature: 'Support', description: 'Support at $5/hour' },
      { feature: 'Cloud Access', description: 'Full cloud access' }
    ],
    enterprise: [
      { feature: 'Space', description: '10 GB of space' },
      { feature: 'Support', description: 'Support at $5/hour' },
      { feature: 'Cloud Access', description: 'Full cloud access' }
    ]
  };

  selectPlan(plan: string): void {
    this.selectedPlan = plan;
this.route.navigateByUrl('user/payment')
  }
}

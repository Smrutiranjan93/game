import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SpinComponent } from './components/spin/spin.component';
import { HomeComponent } from './components/home/home.component';
import { PaymentComponent } from './components/payment/payment.component';
import { DocumentComponent } from './components/document/document.component';
import { BankDetailsComponent } from './components/bank-details/bank-details.component';



const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path:'home',component:HomeComponent},
      { path:'payment',component:PaymentComponent},
      { path: 'spin', component: SpinComponent },
      { path:'document', component:DocumentComponent},
      { path:'bank-details',component:BankDetailsComponent},
     
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}

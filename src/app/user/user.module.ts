import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    UserRoutingModule,
    RouterModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right', // Positioning the toaster message at the top right
    }),
  ]
})
export class UserModule { }

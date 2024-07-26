import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidenavComponent } from './sidenav/sidenav.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedRoutingModule,
    HeaderComponent,
    FooterComponent,
    SidenavComponent,
  ],
  exports: [HeaderComponent, FooterComponent, SidenavComponent],
})
export class SharedModule {}

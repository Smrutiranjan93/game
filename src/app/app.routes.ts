import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
    { path:'',component:HomeComponent},
    { path:'about-us',component:AboutUsComponent},
    { path:'contact-us',component:ContactUsComponent},
    { path:'login',component:LoginComponent},
    {
        path: 'user',
        loadChildren: () => import('./user/user.module').then((m) => m.UserModule),
      },
];

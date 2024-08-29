import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { LoginComponent } from './pages/login/login.component';
import { UserRegisterComponent } from './pages/user-register/user-register.component';
import { GlobalImpactComponent } from './pages/global-impact/global-impact.component';
import { InvestorRelationComponent } from './pages/investor-relation/investor-relation.component';
import { LeadershipComponent } from './pages/leadership/leadership.component';
import { MissionComponent } from './pages/mission/mission.component';
import { VisionComponent } from './pages/vision/vision.component';
import { OurCompanyComponent } from './pages/our-company/our-company.component';
import { OurDistributorsComponent } from './pages/our-distributors/our-distributors.component';
import { OurExpertsComponent } from './pages/our-experts/our-experts.component';
import { WhoWeAreComponent } from './pages/who-we-are/who-we-are.component';

export const routes: Routes = [
    { path:'',component:HomeComponent},
    { path:'about-us',component:AboutUsComponent},
    { path:'global-impact',component:GlobalImpactComponent},
    { path:'investor-relation',component:InvestorRelationComponent},
    { path:'leadership',component:LeadershipComponent},
    { path:'mission',component:MissionComponent},
    { path:'vision',component:VisionComponent},
    { path:'our-company',component:OurCompanyComponent},
    { path:'our-distributors',component:OurDistributorsComponent},
    { path:'our-experts',component:OurExpertsComponent},
    { path:'who-we-are',component:WhoWeAreComponent},
    // { path:'',component:},
    { path:'contact-us',component:ContactUsComponent},
    { path:'login',component:LoginComponent},
    { path:'register',component:UserRegisterComponent},

    {
        path: 'user',
        loadChildren: () => import('./user/user.module').then((m) => m.UserModule),
      },
];

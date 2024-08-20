import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { provideClientHydration } from '@angular/platform-browser';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';
// export const appConfig: ApplicationConfig = {
//   providers: [provideRouter(routes),importProvidersFrom(HttpClientModule)]
// };
export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),provideHttpClient(withFetch()), provideClientHydration(),provideToastr({
    timeOut: 4000,
    positionClass: 'toast-top-right',
    preventDuplicates: true,
  }), 
    provideAnimations(),]
};

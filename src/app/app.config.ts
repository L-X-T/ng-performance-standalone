import { ApplicationConfig } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideImageKitLoader } from '@angular/common';
import { PreloadAllModules, provideRouter, withPreloading } from '@angular/router';

import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideImageKitLoader('https://ik.imagekit.io/LXT'),
    provideRouter(
      appRoutes,
      // withDebugTracing(),
      // withEnabledBlockingInitialNavigation()
      withPreloading(PreloadAllModules),
    ),
  ],
};

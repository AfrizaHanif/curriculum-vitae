import { ApplicationConfig, LOCALE_ID, inject, provideBrowserGlobalErrorListeners, provideZoneChangeDetection, provideEnvironmentInitializer } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { TitleStrategy, provideRouter, withComponentInputBinding, withInMemoryScrolling } from '@angular/router';
import localeId from '@angular/common/locales/id';

import { routes } from './app.routes';
import { CustomTitleStrategy } from './core/services/custom-title-strategy';
import { loadingInterceptor } from './core/interceptors/loading-interceptor';
import { ThemeService } from './core/services/theme';

registerLocaleData(localeId);

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideAnimations(),
    provideRouter(routes, withComponentInputBinding(), withInMemoryScrolling({ scrollPositionRestoration: 'disabled' })),
    provideHttpClient(withFetch(), withInterceptors([ loadingInterceptor])),
    { provide: LOCALE_ID, useValue: 'id' },
    { provide: TitleStrategy, useClass: CustomTitleStrategy },
    provideEnvironmentInitializer(() => {
      inject(ThemeService).initializeTheme();
    }),
  ]
};

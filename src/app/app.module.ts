import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './views/page-not-found/page-not-found.component';
import { NgBootstrapModule } from './ng-bootstrap/ng-bootstrap.module';
import { HeroSliderComponent } from './components/hero-slider/hero-slider.component';
import { HeroOwlCarouselComponent } from './components/hero-owl-carousel/hero-owl-carousel.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconsModule } from './icons/icons.module';
import { FooterComponent } from './components/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthGuard } from './services/auth.guard';
import { AuthAdminGuard } from './services/auth-admin.guard';
import { AppErrorHandler } from './common/app-error-handler';
import { httpInterceptorProviders } from './helpers/http-interceptor-providers';

export function tokenGetter() {
  return localStorage.getItem('token');
}
@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgBootstrapModule,
    HeroSliderComponent,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['example.com'],
        disallowedRoutes: ['http://example.com/examplebadroute/'],
      },
    }),
  ],
  providers: [
    AuthGuard,
    AuthAdminGuard, // found out the app works fine without registering the Guard here!
    {
      provide: ErrorHandler,
      useClass: AppErrorHandler,
    },
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

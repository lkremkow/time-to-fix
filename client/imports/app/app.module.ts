import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AboutComponent } from './about/about.component';
import { Home } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AvgTmeTFxComponent } from './avg-tme-t-fx/avg-tme-t-fx.component';
import { YourPerimeter } from './your-perimeter/your-perimeter.component';
import { YourStatistics } from './your-statistics/your-statistics.component';
import { CompareYourStatistics } from './compare-your-statistics/compare-your-statistics.component';
import { YourProfile } from './your-profile/your-profile.component';
import { PublicStatistics } from './public-statistics/public-statistics.component';
import { ComparedToOthers } from './compared-to-others/compared-to-others.component';
import { PublicComparison } from './public-comparison/public-comparison.component';
import { LogoutComponent } from './logout/logout.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path: 'home',
        component: Home
      },
      {
        path: 'ps',
        component: PublicStatistics
      },
      {
        path: 'yp',
        component: YourPerimeter
      },
      {
        path: 'profile',
        component: YourProfile
      },       
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'about',
        component: AboutComponent
      },
      {
        path: 'logout',
        component: LogoutComponent
      },      
      {
        path: 'AvgTmeTFxComponent',
        component: AvgTmeTFxComponent
      },
      // Home Page
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
      },
      // 404 Page
      {
        path: '**',
        component: PageNotFoundComponent
      }
    ], { enableTracing: false} ),
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    AboutComponent,
    LoginComponent,
    Home,
    PageNotFoundComponent,
    AvgTmeTFxComponent,
    YourPerimeter,
    YourStatistics,
    CompareYourStatistics,
    YourProfile,
    PublicStatistics,
    ComparedToOthers,
    PublicComparison,
    LogoutComponent
  ],
  bootstrap: [
    AppComponent
  ],
  providers: [
  ]
})

export class AppModule { }

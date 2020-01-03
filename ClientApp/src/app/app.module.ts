import { ApiCallService } from './_services/apicall.service';
import { AuthGuard } from './auth.guard';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ValueComponent } from './value/value.component';
import { AuthService } from './_services/auth.service';
import { TeamComponent } from './team/team.component';
import { Page1Component } from './page1/page1.component';
import { CarouselModule } from 'ngx-bootstrap';
import { Select2Module } from 'ng2-select2';
import { ScheduleComponent } from './schedule/schedule.component';
import { StandingComponent } from './standing/standing.component';

@NgModule({
   declarations: [
      AppComponent,
      NavMenuComponent,
      HomeComponent,
      LoginComponent,
      SignUpComponent,
      ValueComponent,
      TeamComponent,
      Page1Component,
      ScheduleComponent,
      StandingComponent,
   ],
   imports: [
      BrowserModule.withServerTransition({appId: 'ng-cli-universal' }),
      CarouselModule,
    HttpClientModule,
    Select2Module,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'team', component: TeamComponent,canActivate:[AuthGuard] },
      { path: 'login', component: LoginComponent},
        {path: 'standing', component:StandingComponent},
        { path: 'signup', component: SignUpComponent },
        {path:'players', component:Page1Component},
        {path:'login',component:LoginComponent},
        {path:'schedule', component:ScheduleComponent},
      { path: "**",component:HomeComponent}
    ])
  ],
  providers: [
    AuthService,
    ApiCallService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

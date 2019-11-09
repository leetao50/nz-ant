import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FrameRoutingModule } from './frame-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { LoginWithUsernameComponent } from './pages/login-with-username/login-with-username.component';


@NgModule({
  declarations: [LoginComponent, LoginWithUsernameComponent, ],
  imports: [
    CommonModule,
    FrameRoutingModule
  ]
})
export class FrameModule { }

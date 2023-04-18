import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { SignupComponent } from './signup/signup.component';

import { ProfileComponent } from './profile/profile.component';
import { QuestionComponent } from './question/question.component';
import { VerifiedComponent } from './verified/verified.component';

const routes: Routes = [
  { path: "", component: SignupComponent },
  { path: "login", component: LoginComponent },
  { path: "dashboard", component: DashboardComponent, canActivate: [AuthGuard] },
  { path: "profile", component: ProfileComponent },
  { path: "question", component: QuestionComponent },
  {path:"verified",component:VerifiedComponent}

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CarsListComponent } from './cars-list/cars-list.component';
import { AuthGuard } from './auth.guard'; // Create this guard

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: CarsListComponent, canActivate: [AuthGuard] },
  { path: 'cars', redirectTo: '', pathMatch: 'full' }, // optional alias
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
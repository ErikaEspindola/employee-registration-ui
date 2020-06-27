import { DetailComponent } from './detail/detail.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './users/login/login.component';
import { ListComponent } from './employees/list/list.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'list-employees', component: ListComponent },
  { path: 'detail-employees', component: DetailComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

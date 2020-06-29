import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './users/login/login.component';
import { ListComponent } from './employees/list/list.component';
import { DetailComponent } from './employees/detail/detail.component';
import { AddComponent } from './employees/add/add.component';
import { EditComponent } from './employees/edit/edit.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'list-employees', component: ListComponent },
  { path: 'detail-employees', component: DetailComponent },
  { path: 'add-employee', component: AddComponent },
  { path: 'edit-employee', component: EditComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

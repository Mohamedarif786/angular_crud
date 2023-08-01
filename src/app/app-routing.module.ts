import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponentComponent } from './user-component/user-component.component';

const routes: Routes = [
  {path:'crud',component:UserComponentComponent},
  {path:'',redirectTo:'/crud',pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

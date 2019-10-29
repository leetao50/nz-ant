import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main.component';
import { DetailComponent } from './detail/detail.component';


const routes: Routes = [
  {
    path:'main',component:MainComponent,
        children:[
          {
              path:':id',
              component:DetailComponent,
              pathMatch:'full'
          }
        ]
  },
  { path: '', redirectTo: '/main', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }

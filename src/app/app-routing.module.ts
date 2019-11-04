import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SetupComponent } from './pages/setup/setup.component';
import { SummaryComponent } from './pages/summary/summary.component';


const routes: Routes = [
  { path: 'setup', component: SetupComponent },
  { path: 'summary', component: SummaryComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

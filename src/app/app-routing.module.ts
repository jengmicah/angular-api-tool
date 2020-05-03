import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageSecondComponent } from './page-second/page-second.component';
import { PageFirstComponent } from './page-first/page-first.component';

const routes: Routes = [
  { path: '', redirectTo: '/query', pathMatch: 'full' },
  { path: 'query', component: PageFirstComponent, data: { title: 'Query Metadata' } },
  { path: 'comingsoon', component: PageSecondComponent, data: { title: 'Coming Soon...' } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
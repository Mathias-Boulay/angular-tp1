import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { FestivalDetailsComponent } from './components/festival/festival-details/festival-details.component';
import { FestivalsListComponent } from './components/festival/festivals-list/festivals-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'festivals', component: FestivalsListComponent },
  { path: 'festival/:festivalId', component: FestivalDetailsComponent },
  { path: 'App', component: AppComponent },
  { path: '', redirectTo: '/App', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

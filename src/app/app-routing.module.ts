import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home/home.component';
import { UserDetailsComponent } from './components/home/user-details/user-details.component';

const routes: Routes = [
 { path: '', component: HomeComponent },
  { path: 'user/:id', component: UserDetailsComponent},
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

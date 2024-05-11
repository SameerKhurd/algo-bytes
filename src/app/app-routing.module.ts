import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavigationComponent } from './navigation/navigation.component';
import { HomeComponent } from './pages/home/home.component';
import { ProblemComponent } from './pages/problem/problem.component';
import { ProblemsComponent } from './pages/problems/problems.component';

const routes: Routes = [
  // { path: 'default', component: NavigationComponent },
  {
    path: 'problems',
    component: ProblemsComponent,
    children: [{ path: ':qid', component: ProblemComponent }],
  },
  // { path: 'home', component: HomeComponent },
  { path: '', redirectTo: 'problems', pathMatch: 'full' },
  {
    path: '**',
    redirectTo: 'problems',
    //canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

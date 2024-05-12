import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProblemComponent } from './pages/problem/problem.component';
import { ProblemsComponent } from './pages/problems/problems.component';

const routes: Routes = [
  {
    path: 'problems',
    component: ProblemsComponent,
    children: [{ path: ':qid', component: ProblemComponent }],
  },
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

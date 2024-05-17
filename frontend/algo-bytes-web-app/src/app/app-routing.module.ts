import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProblemComponent } from './pages/main/problem/problem.component';
import { ProblemsComponent } from './pages/main/problems/problems.component';
import { MainComponent } from './pages/main/main.component';

const routes: Routes = [
  {
    path: 'problems',
    component: MainComponent,

    children: [
      {
        path: 'top-25',
        component: ProblemsComponent,
        children: [{ path: ':qid', component: ProblemComponent }],
      },
      {
        path: 'top-10',
        component: ProblemsComponent,
        children: [{ path: ':qid', component: ProblemComponent }],
      },
      {
        path: '',
        component: ProblemsComponent,
        children: [{ path: ':qid', component: ProblemComponent }],
      },
    ],
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

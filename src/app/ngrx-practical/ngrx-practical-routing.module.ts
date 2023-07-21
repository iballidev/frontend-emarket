import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgrxPracticalComponent } from './ngrx-practical.component';

const routes: Routes = [
  {
    path: '',
    component: NgrxPracticalComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./todo/todo.module').then((mod) => mod.TodoModule),
      },
      {
        path: 'todo',
        loadChildren: () =>
          import('./todo/todo.module').then((mod) => mod.TodoModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NgrxPracticalRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UiDesignComponent } from './ui-design.component';

const routes: Routes = [
  {path: "", component: UiDesignComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UiDesignRoutingModule { }

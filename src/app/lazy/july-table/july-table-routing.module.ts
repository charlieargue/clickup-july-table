import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JulyTableComponent } from './july-table.component';

const appRoutes: Routes = [
  {
    path: '',
    component: JulyTableComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(appRoutes)],
  exports: [RouterModule],
})
export class JulyTableRoutingModule {}

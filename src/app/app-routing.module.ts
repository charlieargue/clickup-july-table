import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { JulyTableModule } from './lazy/july-table/july-table.module';

const routes: Routes = [
  // *****************************************
  // *****************************************
  // LAZY-LOADED paths and modules+components
  // *****************************************
  // *****************************************
  { path: '', loadChildren: () => JulyTableModule },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      // preload all lazy modules (during down/idle time)
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}

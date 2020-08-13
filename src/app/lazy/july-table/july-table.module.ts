import { NgModule } from '@angular/core';
import { JulyTableRoutingModule } from './july-table-routing.module';
import { JulyTableComponent } from './july-table.component';
import { HotTableModule } from '@handsontable/angular';
import { DataService } from '../../services/data.service';
import { SearchFormComponent } from '../../components/search-form/search-form.component';
import { SearchFormKeypressDirective } from '../../directives/search-form-keypress.directive';
import { CommonModule } from '@angular/common';


@NgModule({
  imports: [CommonModule, JulyTableRoutingModule, HotTableModule],
  declarations: [
    JulyTableComponent,
    SearchFormComponent,
    SearchFormKeypressDirective,
  ],
  providers: [DataService],
})
export class JulyTableModule {}

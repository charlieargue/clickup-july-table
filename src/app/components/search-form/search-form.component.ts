import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState, selectSearch } from '../../state/reducers';
import { SetSearch } from '../../state/actions/july-table.actions';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
})
export class SearchFormComponent implements OnInit {
  search$: Observable<string>;

  constructor(public store: Store<AppState>) {
    this.search$ = store.pipe(select(selectSearch));
  }

  ngOnInit(): void { }

  clear() {
    this.store.dispatch(new SetSearch(''));
  }
}

import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState, selectSearch } from '../../state/reducers';
import { SetSearch } from '../../state/actions/july-table.actions';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-search-form',
  template: `
    <div style="margin-bottom: 16px;">
      <input
        tabindex="1"
        appSearchFormKeypress
        type="text"
        id="tbxSearch"
        autofocus
        value="{{ search$ | async }}"
        placeholder="Press ENTER to search..."
      />
      <button
        id="btnClear"
        tabindex="2"
        style="margin-left: 8px;cursor: pointer;"
        (click)="clear()"
      >
        ❌
      </button>
    </div>
  `,
})
export class SearchFormComponent implements OnInit {
  search$: Observable<string>;

  constructor(public store: Store<AppState>) {
    this.search$ = store.pipe(select(selectSearch));
  }

  ngOnInit(): void {}

  clear() {
    this.store.dispatch(new SetSearch(''));
  }
}

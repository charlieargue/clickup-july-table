import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import isNil from 'lodash/isNil';
import isEmpty from 'lodash/isEmpty';
import { Column } from '../../state/models/column';
import { Store, select } from '@ngrx/store';
import { AppState, selectPage, selectSearch } from '../../state/reducers';
import { IncrementPage } from '../../state/actions/july-table.actions';
import { HotTableRegisterer } from '@handsontable/angular';
import { DataService } from '../../services/data.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { columns } from '../../_mocked-data';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/internal/operators/take';

@UntilDestroy()
@Component({
  selector: 'app-july-table',
  template: `
    <div *ngIf="dataset.length">
      <app-search-form></app-search-form>
      <hot-table
        [hotId]="id"
        [settings]="tableSettings"
        [data]="dataset"
        licenseKey="non-commercial-and-evaluation"
      ></hot-table>
      <button id="btnLoadMore" style="margin-top: 16px;" (click)="increment()">
        Load More
      </button>
    </div>
  `,
})
export class JulyTableComponent implements OnInit, OnDestroy {
  page$: Observable<number>;
  search$: Observable<string>;
  urlPage: string;
  state$: Observable<any>;
  columns: Column[] = columns;
  dataset: any[] = [];
  datasetShadow: any[] = [];
  private hotRegisterer = new HotTableRegisterer();
  id = 'july-hot-table';
  tableSettings: any;
  multiColSortingConfig = {
    sortEmptyCells: true,
    initialConfig: [
      {
        column: 0,
        sortOrder: 'asc',
      },
      {
        column: 2,
        sortOrder: 'desc',
      },
    ],
  };

  // ------------------------
  constructor(
    public store: Store<AppState>,
    private dataService: DataService,
    private router: Router,
    public route: ActivatedRoute
  ) {
    this.page$ = store.pipe(take(1), select(selectPage));
    this.search$ = store.pipe(take(1), select(selectSearch));
  }

  // ------------------------
  public ngOnInit() {
    this.store.pipe(select(selectSearch)).subscribe((newSearch: string) => {
      if (isNil(newSearch) || isEmpty(newSearch)) {
        this.dataset = [...this.datasetShadow];
      } else {
        this.datasetShadow = [...this.dataset];
        this.dataset = this.dataset.filter((row) => {
          return JSON.stringify(row).includes(newSearch);
        });
      }
    });

    this.page$.pipe(take(1), untilDestroyed(this)).subscribe((p) => {
      this.dataService
        .getData(p.toString())
        .pipe(take(1), untilDestroyed(this))
        .subscribe((result) => {
          this.dataset = result;
          this.datasetShadow = [...this.dataset];
          this.initializeTable();
        });
    });
  }

  initializeTable() {
    this.tableSettings = {
      rowHeaders: true,
      stretchH: 'all',
      manualRowResize: true,
      manualColumnResize: true,
      colHeaders: this.columns.map((c) => c.name),
      manualRowMove: false,
      manualColumnMove: true,
      contextMenu: true,
      filters: true,
      dropdownMenu: true,
      persistentState: true,
      multiColumnSorting: this.multiColSortingConfig,
    };
  }

  public increment() {
    this.store.dispatch(new IncrementPage());
    this.page$.pipe(take(1), untilDestroyed(this)).subscribe((p) => {
      this.dataService
        .getData(p.toString())
        .pipe(take(1), untilDestroyed(this))
        .subscribe((result) => {
          this.dataset = [...this.dataset, ...result];
          this.datasetShadow = [...this.dataset];
          this.router.navigate([], {
            relativeTo: this.route,
            queryParams: {
              page: p,
            },
            queryParamsHandling: 'merge', // remove to replace all query params by provided
          });
          this.hotRegisterer.getInstance(this.id).loadData(this.dataset);
        });
    });
  }

  public ngOnDestroy() {}
}

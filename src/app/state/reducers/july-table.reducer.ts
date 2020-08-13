import { createEntityAdapter, EntityState, EntityAdapter } from '@ngrx/entity';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Column } from '../models/column';
import {
  JulyTableActionTypes,
  JulyTableActions,
} from '../actions/july-table.actions';

interface ColumnState extends EntityState<Column> {
  total: number;
}

export interface State {
  search: string;
  page: number;
  columns: ColumnState;
}

const adapterColumn = createEntityAdapter<Column>();
const columnInitialState: ColumnState = adapterColumn.getInitialState({
  total: 0,
});

const initialState = {
  search: '',
  dataset: [],
  page: 1,
  columns: columnInitialState,
};

export function reducer(
  state: State = initialState,
  action: JulyTableActions
): State {
  switch (action.type) {

    case JulyTableActionTypes.SetSearch:
      const { payload } = action;
      return {
        ...state,
        search: payload,
      };

    case JulyTableActionTypes.IncrementPage:
      return {
        ...state,
        page: state.page + 1,
      };

    default:
      return state;
  }
}

export const selectSearch = (state: State) => state.search;
export const selectPage = (state: State) => state.page;

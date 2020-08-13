import {
  ActionReducer,
  ActionReducerMap,
  MetaReducer,
  createFeatureSelector,
  createSelector
} from '@ngrx/store';

import * as fromJulyTable from './july-table.reducer';

export interface AppState {
  julyTable: fromJulyTable.State;
}

export const reducers: ActionReducerMap<AppState> = {
  julyTable: fromJulyTable.reducer
};


// queries / selectors
export const selectJulyTableModule = createFeatureSelector<fromJulyTable.State>('julyTable');
export const selectSearch = createSelector(selectJulyTableModule, fromJulyTable.selectSearch);
export const selectPage = createSelector(selectJulyTableModule, fromJulyTable.selectPage);

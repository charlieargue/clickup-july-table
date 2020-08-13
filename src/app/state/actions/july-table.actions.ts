import { Action } from '@ngrx/store';
import { Column } from '../models/column';

export enum JulyTableActionTypes {
  GetColumnList = '[Column API] Get Column List',
  SetSearch = '[Search API] Set Search Term',
  IncrementPage = '[Page API] Increment Page',
}

export class GetColumnList implements Action {
  public readonly type = JulyTableActionTypes.GetColumnList;

  constructor(public payload: Column[]) {}
}

export class SetSearch implements Action {
  public readonly type = JulyTableActionTypes.SetSearch;

  constructor(public payload: string) {}
}

export class IncrementPage implements Action {
  public readonly type = JulyTableActionTypes.IncrementPage;

  constructor() {}
}

export type JulyTableActions = GetColumnList | SetSearch | IncrementPage;

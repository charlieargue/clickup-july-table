import { Column } from './state/models/column';

export const columns: Column[] = [
  { name: 'ID', id: 0, binding: 'id' },
  { name: 'Photo Album Name', id: 1, binding: 'alt_description' },
  { name: 'Date Published', id: 2, binding: 'created_at' },
];

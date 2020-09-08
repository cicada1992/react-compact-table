import _ from 'lodash';

import { Data } from './fakeData';

export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc'
}

export function getSortedItems(items: Data[], sortKey: keyof Data, sortOrder: SortOrder): Data[] {
  const iteratee = (item: Data) => getSortableValue(item, sortKey);
  return _.orderBy(items, [iteratee], [sortOrder]);
}

function getSortableValue(item: Data, sortKey: keyof Data) {
  const { name, objective, conversions, cvr } = item;
  switch (sortKey) {
    case 'name':
      return name.toLocaleLowerCase();
    case 'objective':
      return objective.toLocaleLowerCase();
    case 'conversions':
      return conversions;
    case 'cvr':
      return cvr;
  }
}

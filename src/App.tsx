import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';

import { GoodList } from './components/GoodList';

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

const SORT_BY_LENGTH = 'length';
const SORT_BY_ABC = 'abc';

enum SortType {
  length = SORT_BY_LENGTH,
  abc = SORT_BY_ABC,
}

function createInternalArrayOfObjectsWithId(arr: string[]) {
  return arr.map((item, idx) => {
    return {
      name: item,
      internalId: idx,
    };
  });
}

const goodsListWithId = createInternalArrayOfObjectsWithId(goodsFromServer);

export const App: React.FC = () => {
  const [sortValue, setSortValue] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  let sortedGoods = goodsListWithId.toSorted((good1, good2) => {
    switch (sortValue) {
      case SortType.length:
        return good1.name.length - good2.name.length;
      case SortType.abc:
        return good1.name.localeCompare(good2.name);
      default:
        return 0;
    }
  });

  if (isReversed) {
    sortedGoods = sortedGoods.toReversed();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortValue !== SortType.abc,
          })}
          onClick={() => setSortValue(SortType.abc)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortValue !== SortType.length,
          })}
          onClick={() => setSortValue(SortType.length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': isReversed !== true,
          })}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {(sortValue || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortValue('');
              setIsReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <GoodList goods={sortedGoods} />
    </div>
  );
};

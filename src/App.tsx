import React, { useEffect, useState } from 'react';
import './App.scss';
import { GoodsList } from './GoodsList';
import { Good } from './types/Good';
import { getAll, get5First, getRedGoods } from './api/goods';

export const App: React.FC = () => {
  const [goods, setGoods] = useState<Good[]>([]);
  const [called, setCalled] = useState('');

  useEffect(() => {
    if (called === 'All') {
      getAll().then(goodsFromServer => setGoods(goodsFromServer));
    }

    if (called === '5first') {
      get5First().then(goodsFromServer => setGoods(goodsFromServer));
    }

    if (called === 'Red') {
      getRedGoods().then(goodsFromServer => setGoods(goodsFromServer));
    }

    return () => {
      setCalled('');
    };
  }, [called]);

  return (
    <div className="App">
      <h1>Dynamic list of Goods</h1>

      <button
        type="button"
        data-cy="all-button"
        onClick={() => setCalled('All')}
      >
        Load all goods
      </button>

      <button
        type="button"
        data-cy="first-five-button"
        onClick={() => setCalled('5first')}
      >
        Load 5 first goods
      </button>

      <button
        type="button"
        data-cy="red-button"
        onClick={() => setCalled('Red')}
      >
        Load red goods
      </button>

      <GoodsList goods={goods} />
    </div>
  );
};

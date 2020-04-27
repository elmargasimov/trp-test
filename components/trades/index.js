import React, { useState, useEffect } from 'react';
import Table from '../table';

const getRandomDate = (start, end) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
};

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomData = () => {
  const data = [...new Array(30)].map(() => {
    const data = {};
    data.date = getRandomDate(new Date('April 27, 2020'), new Date('May 02, 2020'));
    data.id = getRandomInt(1, 3);
    data.value = getRandomInt(-100, 200);
    return data;
  });

  return Promise.resolve(data);
};

const WORKDAY = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

const traders = [
  {
    name: 'Dan',
    id: 1
  },
  {
    name: 'Berry',
    id: 2
  },
  {
    name: 'Jim',
    id: 3
  }
];

/* Get data to look like this
 * [
 *   {
 *     name: 'Dan',
 *     tradeVolume: [
 *       {
 *         day: 'Monday',
 *         volume: 12
 *       },
 *       {
 *         day: 'Tuesday',
 *         volume: 30
 *       },
 *     ]
 *   }
 * ]
 *
 * */

const Trades = () => {
  const [tradeData, setTradeData] = useState([{}]);

  // filters trades by trader id
  const tradesByTrader = traders.map(trader => {
    trader.trades = tradeData.filter(c => trader.id === c.id);
    return trader;
  });

  // adds trade volume by day
  const tradesByDate = tradesByTrader.map(trader => {
    const volumeAcc = {};

    trader.trades.forEach(trade => {
      const date = trade.date.getDay();

      if (volumeAcc[date]) {
        volumeAcc[date] += trade.value
      } else {
        volumeAcc[date] = trade.value
      }
    });

    trader.tradeVolume = WORKDAY.map((day, index) => {
      return {
        day,
        volume: volumeAcc[index + 1] || 0
      }
    });

    return trader;
  });

  useEffect(() => {
    getRandomData()
    .then((res) => {
      setTradeData(res);
    })
  }, []);

  // This returns the volumes as [1, 234, 43, 53] from the object keys
  const maptradesByVolume = tradesByDate
    .map(item => {
      const values = Object.keys(item.tradeVolume)
        .map(key => item.tradeVolume[key].volume);

      return [item.name].concat(values);
    });

  const tableAttrs = {
    columns: [
      '',
      ...WORKDAY
    ],
    rows: maptradesByVolume
  };

  return (
      <Table {...tableAttrs} />
  );
};

export default Trades;

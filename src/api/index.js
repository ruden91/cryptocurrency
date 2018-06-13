import config from './config.json';
import bithumbMock from './bithumb_mock.json';
import binanceMock from './binance_mock.json';
import { compact, map, filter, find, sortBy } from 'lodash';
export const fetchCurrencyRate = async () => {
  try {
    const res = await fetch(config.currencyRateUrl);
    const data = await res.text();
    return JSON.parse(data);
  } catch (err) {
    console.error(`currencyRate APi: ${err}`);
  }
};

export const fetchBithumbMockData = async () => {
  const res = await fetch('https://api.bithumb.com/public/ticker/All');
  const body = await res.text();
  const data = JSON.parse(body);
  // sample bithumbMock

  return compact(
    Object.keys(data.data).map(symbol => {
      if (symbol !== 'date') {
        const { buy_price } = bithumbMock[symbol];
        return {
          krw_price: buy_price,
          name: symbol,
          exchange: 'bithumb'
        };
      }
    })
  );
};

export const fetchBinanceMockData = async () => {
  const res = await fetch(
    'https://urlreq.appspot.com/req?method=GET&url=https://api.binance.com/api/v3/ticker/price'
  );
  const body = await res.text();
  const data = JSON.parse(body);
  // sample binanceMock.data
  const refinedData = map(data, item => {
    let obj = {
      exchange: 'binance',
      symbol: item.symbol.replace('USDT', 'USD'),
      name: item.symbol.replace(/BTC$|USDT$/g, ''),
      type: getExchangeType(item.symbol)
    };

    obj.type === 'USD'
      ? (obj['dollar_price'] = item.price)
      : (obj['bit_price'] = item.price);

    return obj;
  });
  const usdData = filter(refinedData, item => item.type === 'USD');
  const btcData = filter(
    refinedData,
    item => item.type === 'BTC' && find(usdData, { name: item.name })
  );

  return map(usdData, data => {
    let sameBtcData = find(btcData, { name: data.name });
    if (sameBtcData) {
      data.bit_price = sameBtcData.bit_price;
    } else {
      data.bit_price = 1;
    }
    return data;
  });
};

export function getExchangeType(type) {
  if (type.indexOf('USD') > -1) {
    return 'USD';
  } else if (type.indexOf('BTC') > -1) {
    return 'BTC';
  } else if (type.indexOf('ETH') > -1) {
    return 'ETH';
  } else {
    return undefined;
  }
}

/**
 * 기준데이터와 비교데이터를 조합해서 프리미엄 데이터로 변환된 배열을 리턴해주는 함수
 * @param {Array} standardData 기준데이터
 * @param {Array} comparedData 비교데이터
 *
 * @returns {Array} premiumData 프리미엄데이터
 */
export const setcompareData = (standardData, comparedData) => {
  if (standardData.length === 0 || comparedData.length === 0) {
    return [];
  }

  let result = compact(
    map(standardData, standardItem => {
      let comparedItem = find(comparedData, { name: standardItem.name });
      if (comparedItem) {
        standardItem.dollar_price = Number(comparedItem.dollar_price).toFixed(
          2
        );
        standardItem.btc_price = Number(comparedItem.bit_price);
        standardItem.diffrence = Math.round(comparedItem.dollar_price * 1077.0);

        let percent = (
          ((standardItem.krw_price - standardItem.diffrence) /
            standardItem.diffrence) *
          100
        ).toFixed(2);

        standardItem.premium = `${standardItem.krw_price -
          standardItem.diffrence} (${percent}%)`;

        return standardItem;
      }
    })
  );

  return {
    standardExchange: standardData[0].exchange,
    comparedExchange: comparedData[0].exchange,
    data: sortBy(result, 'btc_price').reverse()
  };
};

import config from './config.json';
import bithumbMock from './bithumb_mock.json';
import binanceMock from './binance_mock.json';
import { compact, map, filter, find, sortBy } from 'lodash';
export const fetchCurrencyRate = async () => {
  try {
    const res = await fetch(config.currencyRateUrl);
    const data = await res.text().body;
    console.log(data);
    return JSON.parse(data);
  } catch (err) {
    console.error(`currencyRate APi: ${err}`);
    const defaultCurrencyRate = [
      {
        Currency: 'USD',
        Sign: '$',
        Rate: '1074.50'
      },
      {
        Currency: 'JPY',
        Sign: '￥',
        Rate: '977.75'
      },
      {
        Currency: 'EUR',
        Sign: '€',
        Rate: '1281.39'
      },
      {
        Currency: 'CNY',
        Sign: '￥',
        Rate: '169.27'
      }
    ];
    return new Promise(resolve => resolve(defaultCurrencyRate));
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

export const fetchGateIoMockData = async () => {
  try {
    const url =
      'https://urlreq.appspot.com/req?method=GET&url=http://data.gate.io/api2/1/tickers';
    const res = await fetch(url);
    const body = await res.text();
    const data = JSON.parse(body);

    let test = map(data, (item, key) => {
      let typeString = String(key.split('_')[1]).toUpperCase();

      let obj = {
        exchange: 'gateio',
        name: String(key.split('_')[0]).toUpperCase(),
        type: getExchangeType(typeString)
      };

      if (obj.type === 'USD') {
        obj['dollar_price'] = item.last;
      } else {
        obj['bit_price'] = item.last;
      }

      return obj;
    });

    let usdData = filter(test, item => item.type === 'USD');

    let btcData = filter(test, item => {
      return item.type === 'BTC' && find(usdData, { name: item.name });
    });
    return map(usdData, data => {
      let sameBtcData = find(btcData, { name: data.name });
      let obj = Object.assign({}, data);
      if (sameBtcData) {
        obj.bit_price = sameBtcData.bit_price;
      } else {
        if (obj.name === 'BTC') {
          obj.bit_price = 1;
        } else {
          obj.bit_price = 0;
        }
      }
      return obj;
    });
  } catch (err) {
    console.error(`gateIo mockData: ${err}`);
  }
};

export const fetchCoinoneMockData = async () => {
  const url =
    'https://urlreq.appspot.com/req?method=GET&url=https://api.coinone.co.kr/ticker?currency=';

  try {
    const res = await fetch(url);
    const body = await res.text();
    const data = JSON.parse(body);

    return map(data, (value, key) => {
      if (key === 'bch') {
        key = 'BCC';
      }

      return {
        krw_price: value.last,
        name: key.toUpperCase(),
        exchange: 'coinone'
      };
    });
  } catch (err) {
    console.log(`coinone api error: ${err}`);
  }
};

export const fetchOkCoinMockData = async () => {
  const url =
    'https://urlreq.appspot.com/req?method=GET&url=https://www.okex.com/v2/spot/markets/tickers';

  try {
    const res = await fetch(url);
    const body = await res.text();
    const data = JSON.parse(body);

    let test = map(data.data, item => {
      let typeString = String(item.symbol.split('_')[1]).toUpperCase();

      let obj = {
        exchange: 'okex',
        name: String(item.symbol.split('_')[0]).toUpperCase(),
        type: getExchangeType(typeString)
      };

      if (obj.type === 'USD') {
        obj['dollar_price'] = item.last;
      } else {
        obj['bit_price'] = item.last;
      }

      return obj;
    });
    let usdData = filter(test, item => item.type === 'USD');

    let btcData = filter(test, item => {
      return item.type === 'BTC' && find(usdData, { name: item.name });
    });
    let mergedData = map(usdData, data => {
      let sameBtcData = find(btcData, { name: data.name });
      let obj = Object.assign({}, data);
      if (sameBtcData) {
        obj.bit_price = sameBtcData.bit_price;
      } else {
        obj.bit_price = 1;
      }
      return obj;
    });
    return mergedData;
  } catch (err) {
    console.error(`ERROR : ${err}`);
  }
};
export const fetchBinanceMockData = async () => {
  const res = await fetch(
    'https://cors-proxy.htmldriven.com/?url=https://api.binance.com/api/v3/ticker/price'
  );
  const body = await res.text();
  const data = JSON.parse(body);

  // sample binanceMock.data
  const refinedData = map(JSON.parse(data.body), item => {
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
        standardItem.diffrence = Math.round(
          comparedItem.dollar_price * window.CURRENCY_RATE
        );

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

export const fetchUpbitTicker = async () => {
  try {
    let UPBITCRIXITEMS = await fetchupbitCrixItems();
    let urls = map(
      filter(
        UPBITCRIXITEMS,
        item =>
          item.code.indexOf('KRW') > -1 &&
          item.exchange === 'UPBIT' &&
          item.marketState === 'ACTIVE'
      ),
      data => {
        return `https://crix-api.upbit.com/v1/crix/trades/ticks?code=CRIX.UPBIT.KRW-${
          data.baseCurrencyCode
        }&count=1`;
      }
    );

    return Promise.all(
      urls.map(url => fetch(url).then(resp => resp.text()))
    ).then(res => {
      return res.map(data => {
        const dataSet = JSON.parse(data);
        const { code, tradePrice } = dataSet[0];
        return {
          name: code.split('-')[1],
          krw_price: tradePrice,
          exchange: 'upbit'
        };
      });
    });
  } catch (err) {
    console.error(`upbit api error: ${err}`);
  }
};

export async function fetchupbitCrixItems() {
  let timestamp = new Date().valueOf();
  let url = `https://urlreq.appspot.com/req?method=GET&url=https://s3.ap-northeast-2.amazonaws.com/crix-production/crix_master?nonce=${timestamp}`;
  try {
    let res = await fetch(url);
    let body = await res.text();
    let data = JSON.parse(body);
    return data;
  } catch (err) {
    console.error(`upbit crix data error: ${err}`);
  }
}

export const fetchCoinMarketCapData = async () => {
  let res = await fetch('https://api.coinmarketcap.com/v2/global/');
  let body = await res.text();
  let data = JSON.parse(body);

  return data;
};

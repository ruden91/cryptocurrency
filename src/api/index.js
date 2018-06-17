import config from './config.json';
import bithumbMock from './bithumb_mock.json';
import binanceMock from './binance_mock.json';
import { compact, map, filter, find, sortBy } from 'lodash';
import axios from 'axios';
import { database } from 'config/firebase';
import moment from 'moment';

export const setBithumbData = data => {
  return compact(
    Object.keys(JSON.parse(data).data).map(symbol => {
      if (symbol !== 'date') {
        const { buy_price } = JSON.parse(data).data[symbol];
        return {
          krw_price: buy_price,
          name: symbol,
          exchange: 'bithumb'
        };
      }
    })
  );
};

export const setGateIoData = data => {
  try {
    let test = map(JSON.parse(data), (item, key) => {
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

export const setCoinoneData = jsonData => {
  try {
    const data = JSON.parse(jsonData);
    return compact(
      map(data, (value, key) => {
        if (typeof value === 'object') {
          if (key === 'bch') {
            key = 'BCC';
          }
          return {
            krw_price: value.last,
            name: key.toUpperCase(),
            exchange: 'coinone'
          };
        }
      })
    );
  } catch (err) {
    console.log(`coinone api error: ${err}`);
  }
};

export const setOkCoinData = data => {
  try {
    let test = map(JSON.parse(data).data, item => {
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
export const setBinanceData = jsonData => {
  const refinedData = map(JSON.parse(jsonData), item => {
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
  if (!standardData || !comparedData) {
    return [];
  }

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

  return sortBy(result, 'btc_price').reverse();
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
  console.log(data);
  return data;
};

// 환율 데이터 가져오는 함수
export const fetchCurrencyRate = async () => {
  try {
    let res = await axios.get(
      'https://urlreq.appspot.com/req?method=GET&url=http://info.finance.naver.com/marketindex/exchangeList.nhn'
    );
    let div = document.createElement('div');
    let result = [];
    div.innerHTML = res.data;
    let trs = div.querySelectorAll('tbody tr');
    for (let i = 0; i < trs.length; i++) {
      result.push({
        name: trs[i].querySelector('.tit').textContent.trim(),
        value: trs[i].querySelector('.sale').textContent.trim()
      });
    }
    // let timestamp = new Date().valueOf();
    return result;
  } catch (err) {
    console.error(err);
  }
};

export const setBittrexData = data => {
  try {
    let test = map(JSON.parse(data).result, data => {
      let obj = {
        exchange: 'bittrex',
        name: data.MarketName.split('-')[1],
        type: data.MarketName.split('-')[0]
      };
      if (obj.type === 'USDT') {
        obj['dollar_price'] = data.Last;
      } else {
        obj['bit_price'] = data.Last;
      }
      return obj;
    });

    let usdData = filter(test, item => item.type === 'USDT');

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
    console.log(`bittrex api error: ${err}`);
  }
};

export const setPoloniexData = data => {
  try {
    let test = map(JSON.parse(data), (item, key) => {
      let obj = {
        exchange: 'poloniex',
        name: key.split('_')[1],
        type: getExchangeType(key)
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
    // return map(res.data, (value, key) => {
    //   if (key === "bch") {
    //     key = "BCC";
    //   }

    //   return {
    //     krw_price: value.last,
    //     name: key.toUpperCase(),
    //     exchange: "coinone"
    //   };
    // });
  } catch (err) {
    console.log(`coinone api error: ${err}`);
  }
};

export const setHitbtcData = data => {
  try {
    let test = map(JSON.parse(data), item => {
      let obj = {
        exchange: 'hitbtc',
        name: item.symbol.replace(/BTC$|USD$/g, ''),
        type: getExchangeType(item.symbol)
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
    console.log(`hitbtc api error: ${err}`);
  }
};

export const setBitfinexData = data => {
  try {
    console.log(JSON.parse(data));
    // return filterBySpecificOrder(res.data);
  } catch (err) {
    console.error(`ERROR : ${err}`);
  }
};

export const bitfinexParams = () => {
  let usedCrix = [
    'BTC',
    'BCH',
    'ETH',
    'DSH',
    'ZEC',
    'XMR',
    'LTC',
    'BTG',
    'ETC',
    'QTM',
    'EOS',
    'OMG',
    'MIT',
    'XRP',
    'GNT',
    'TRX'
  ];
  let result = map(usedCrix, item => {
    if (item === 'BTC') {
      return `t${item}USD`;
    } else {
      return `t${item}USD,t${item}BTC`;
    }
  });

  return result.join(',');
};

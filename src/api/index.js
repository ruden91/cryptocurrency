import config from './config.json';

export const fetchCurrencyRate = async () => {
  try {
    const res = await fetch(config.currencyRateUrl);
    const data = await res.text();
    return JSON.parse(data);
  } catch (err) {
    console.error(`currencyRate APi: ${err}`);
  }
};

import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import 'moment/locale/ko';
const StyledMarketCap = styled.div`
  ul {
    margin: 0;
    padding: 0;

    li {
      margin: 0;
      padding: 0;
      list-style: none;
      line-height: 31px;
      font-size: 18px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      color: #40a9ff;
      em {
        color: #222;
        font-style: normal;
        font-weight: 600;
        padding-right: 10px;
      }
    }
  }
`;
const MarketCap = props => {
  const {
    data: {
      active_cryptocurrencies,
      active_markets,
      bitcoin_percentage_of_market_cap,
      quotes: {
        USD: { total_market_cap, total_volume_24h }
      }
    }
  } = props.marketCapData;
  return (
    <StyledMarketCap>
      <ul>
        <li>
          <em>암호화폐</em> {active_cryptocurrencies.toLocaleString()}개
        </li>
        <li>
          <em>거래소</em> {active_markets.toLocaleString()}개
        </li>
        <li>
          <em>BTC 점유율</em> {bitcoin_percentage_of_market_cap}%
        </li>
        <li>
          <em>시가총액</em> ₩{(
            total_market_cap * window.CURRENCY_RATE
          ).toLocaleString()}
        </li>
        <li>
          <em>24시간 거래량</em> ₩{(
            total_volume_24h * window.CURRENCY_RATE
          ).toLocaleString()}
        </li>
      </ul>
    </StyledMarketCap>
  );
};

export default MarketCap;

import React from 'react';
import styled from 'styled-components';
import { Carousel } from 'antd';
const StyledMarketCap = styled.div`
  margin: -24px;
  .ant-carousel .slick-slide {
    text-align: center;
    height: 160px;
    background: #364d79;
    padding: 60px 0;
    overflow: hidden;
  }

  .ant-carousel .slick-slide h3 {
    color: #fff;
  }
  /* ul {
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
  } */
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
      <Carousel vertical autoplay>
        <div>
          <h3>
            암호화폐<br />
            {active_cryptocurrencies.toLocaleString()}개
          </h3>
        </div>
        <div>
          <h3>
            거래소<br />
            {active_markets.toLocaleString()}개
          </h3>
        </div>
        <div>
          <h3>
            BTC 점유율<br />
            {bitcoin_percentage_of_market_cap}%
          </h3>
        </div>
        <div>
          <h3>
            시가총액<br />₩{(
              total_market_cap * window.CURRENCY_RATE
            ).toLocaleString()}
          </h3>
        </div>
        <div>
          <h3>
            24시간 거래량<br />₩{(
              total_volume_24h * window.CURRENCY_RATE
            ).toLocaleString()}
          </h3>
        </div>
      </Carousel>
    </StyledMarketCap>
  );
};

export default MarketCap;

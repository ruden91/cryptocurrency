// @flow
import React from 'react';
import styled from 'styled-components';
import { Spin } from 'antd';
type Props = {
  currencyRate: Array<mixed>
};

const StyledExchangeRate = styled.div`
  text-align: center;
  ul {
    margin: 0;
    padding: 0;
    li {
      text-align: left;
      list-style: none;
      overflow: hidden;
      text-overflow: ellipsis;
      word-break: break-all;
      white-space: nowrap;
      color: rgba(0, 0, 0, 0.85);
      font-size: 16px;
      line-height: 38px;
      height: 38px;
    }
  }
`;
const ExchangeRate = (props: Props) => {
  const hasData = !(props.currencyRate.length === 0) ? true : false;

  return (
    <StyledExchangeRate>
      {!hasData && <Spin />}
      {hasData && (
        <ul>
          {props.currencyRate.map((item, index) => (
            <li key={index}>
              {item.Sign} {item.Rate}
            </li>
          ))}
        </ul>
      )}
    </StyledExchangeRate>
  );
};

export default ExchangeRate;

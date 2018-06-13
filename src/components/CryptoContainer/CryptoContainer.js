import React, { Component } from 'react';
import CryptoList from 'components/CryptoList';
import CryptoTitle from 'components/CryptoTitle';

export default class CryptoContainer extends Component {
  render() {
    const { cryptoDataSet } = this.props;
    return (
      <div>
        {cryptoDataSet.map(data => {
          return (
            <div>
              {data.standardExchange && (
                <CryptoTitle
                  title={data.standardExchange}
                  description="기준거래소"
                />
              )}
              {data.comparedExchange && (
                <CryptoTitle
                  title={data.comparedExchange}
                  description="비교거래소"
                />
              )}
              <CryptoList {...data} />
            </div>
          );
        })}
      </div>
    );
  }
}

import React, { Component } from 'react';
import CryptoList from 'components/CryptoList';
import CryptoTitle from 'components/CryptoTitle';
import CryptoFilter from 'containers/CryptoFilter';

export default class CryptoContainer extends Component {
  render() {
    const {
      cryptoDataSet,
      selectedStandardExchanges,
      selectedComparedExchanges,
      standardExchanges,
      comparedExchanges,
      onHandleCryptoFilter
    } = this.props;
    return (
      <div>
        <CryptoFilter
          title="기준 거래소 전체"
          type="standard"
          initialFilters={standardExchanges}
          filters={selectedStandardExchanges}
          onHandleCryptoFilter={onHandleCryptoFilter}
        />
        <CryptoFilter
          title="비교 거래소 전체"
          type="compare"
          initialFilters={comparedExchanges}
          filters={selectedComparedExchanges}
          onHandleCryptoFilter={onHandleCryptoFilter}
        />
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

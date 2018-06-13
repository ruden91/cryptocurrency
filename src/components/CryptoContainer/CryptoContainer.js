import React, { Component } from 'react';
import CryptoList from 'components/CryptoList';

export default class CryptoContainer extends Component {
  render() {
    const { cryptoDataSet } = this.props;
    return <div>{cryptoDataSet.map(data => <CryptoList {...data} />)}</div>;
  }
}

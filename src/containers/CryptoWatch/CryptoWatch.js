import React, { Component } from 'react';
import { Select } from 'antd';
import cryptowatch from 'api/cryptowatch.json';

import { map, compact, uniqBy, filter, flatten, find } from 'lodash';
const Option = Select.Option;
export default class CryptoWatch extends Component {
  state = {
    exchangesList: map(cryptowatch.data, data => data.exchange),
    selectedExchange: cryptowatch.data[0].exchange,
    selectedAsset: 'btc',
    selectedType: 'usdt'
  };

  handleExchange = value => {
    const selectedAsset = find(cryptowatch.data, { exchange: value }).coins[0];
    const selectedType = find(cryptowatch.data, { exchange: value }).types[0];
    this.setState({
      selectedExchange: value,
      selectedAsset,
      selectedType
    });
  };
  // async componentDidMount() {
  //   let res = await fetch(
  //     'https://cors-proxy.htmldriven.com/?url=https://embed.cryptowat.ch/exchanges/binance'
  //   );
  //   let body = await res.text();
  //   let data = JSON.parse(body);
  //   let div = document.createElement('div');

  //   div.innerHTML = data.body;
  //   let summaries = JSON.parse(
  //     div.querySelector('#rankings-root').dataset.reactProps
  //   ).summaries;
  //   let refinedSummaries = map(summaries, (value, key) => key);
  //   let test = map(refinedSummaries, value => {
  //     return {
  //       exchange: value.split(':')[0],
  //       name: value
  //         .split(':')[1]
  //         .replace(/krw|usd$|usdt$|eth$|btc$|BTC$|USDT$/g, ''),
  //       type: value.match(/krw|usd$|usdt$|eth$|btc$|BTC$|USDT$/g)
  //     };
  //   });
  //   let exchanges = uniqBy(compact(map(test, data => data.exchange)));
  //   console.log(test);
  //   this.wtf = exchanges.map(item => {
  //     return {
  //       exchange: item,
  //       coins: uniqBy(
  //         map(filter(test, data => data.exchange === item), value => value.name)
  //       ),
  //       types: compact(
  //         uniqBy(
  //           flatten(
  //             map(
  //               filter(test, data => data.exchange === item),
  //               value => value.type
  //             )
  //           )
  //         )
  //       )
  //     };
  //   });
  //   this.setState({
  //     wtf: this.wtf
  //   });
  // }

  render() {
    const {
      selectedExchange,
      selectedAsset,
      selectedType,
      exchangesList
    } = this.state;
    this.assetsList = find(cryptowatch.data, {
      exchange: this.state.selectedExchange
    }).coins;

    this.typesList = find(cryptowatch.data, {
      exchange: this.state.selectedExchange
    }).types;

    console.log(selectedAsset);
    console.log(selectedType);
    return (
      <div>
        <Select
          defaultValue={selectedExchange}
          style={{ width: 120 }}
          onChange={value => this.handleExchange(value)}
        >
          {exchangesList.map(exchange => (
            <Option value={exchange}>{exchange}</Option>
          ))}
        </Select>
        <Select
          defaultValue={selectedAsset}
          style={{ width: 120 }}
          onChange={value => this.setState({ selectedAsset: value })}
        >
          {this.assetsList.map(asset => <Option value={asset}>{asset}</Option>)}
        </Select>
        <Select
          defaultValue={selectedType}
          style={{ width: 120 }}
          onChange={value => this.setState({ selectedType: value })}
        >
          {this.typesList.map(type => <Option value={type}>{type}</Option>)}
        </Select>
        <iframe
          title="cryptowatch"
          src={`https://embed.cryptowat.ch/markets/${selectedExchange}/${selectedAsset}/${selectedType}`}
          frameborder="0"
          allowfullscreen="true"
          width="100%"
          height="450"
        />
      </div>
    );
  }
}

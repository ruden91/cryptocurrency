// @flow
import React, { Component } from 'react';
import styled from 'styled-components';
import { Layout } from 'antd';
import { Card, Col, Row } from 'antd';

import GlobalHeader from 'components/GlobalHeader';
import GlobalFooter from 'components/GlobalFooter';
import CryptoContainer from 'components/CryptoContainer';
import ChatContainer from 'components/ChatContainer';
import ExchangeRate from 'components/ExchangeRate';
import MarketCap from 'components/MarketCap';
import { BarChart, Bar } from 'recharts';
import {
  fetchCurrencyRate,
  fetchBithumbMockData,
  fetchBinanceMockData,
  fetchGateIoMockData,
  fetchOkCoinMockData,
  fetchCoinoneMockData,
  fetchUpbitTicker,
  fetchCoinMarketCapData,
  setcompareData
} from 'api';
import { initSocket, fetchTickerData } from 'helpers/socket';
import { isEmpty } from 'lodash';
import './App.css';
const { Content } = Layout;

const sampleData = [
  { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
  { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
  { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
  { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
  { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
  { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
  { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 }
];

const StyledContent = styled(Content)`
  padding: 20px;
`;

const StyledRow = styled(Row)`
  margin-bottom: 20px;
`;

type State = {
  binanceData: Array<{}>,
  bithumbData: Array<{}>,
  coinoneData: Array<{}>,
  gateIoData: Array<{}>,
  okCoinData: Array<{}>,
  upbitData: Array<{}>,
  okexData: Array<{}>,
  coinoneData: Array<{}>,
  currencyRate: Array<mixed>,
  dataSource: Array<{}>,
  marketCapData: Object
};

class App extends Component<{}, State> {
  state = {
    binanceData: [],
    bithumbData: [],
    gateIoData: [],
    okexData: [],
    upbitData: [],
    okCoinData: [],
    coinoneData: [],
    currencyRate: [],
    dataSource: [],
    marketCapData: {}
  };
  componentDidMount() {
    fetchCurrencyRate().then(currencyRate => {
      window.CURRENCY_RATE = Number(currencyRate[0].Rate);
      this.setState({
        currencyRate
      });
    });
    // const socket = initSocket();
    // fetchTickerData(socket, 'binance');
    // setInterval(() => {
    //   fetchBithumbMockData().then(bithumbData => {
    //     this.setState({
    //       bithumbData
    //     });
    //   });
    // }, 3000);

    // setInterval(() => {
    //   fetchBinanceMockData().then(binanceData => {
    //     this.setState({
    //       binanceData
    //     });
    //   });
    // }, 3000);

    // setInterval(() => {
    //   fetchGateIoMockData().then(gateIoData => {
    //     this.setState({
    //       gateIoData
    //     });
    //   });
    // }, 3000);

    // setInterval(() => {
    //   fetchOkCoinMockData().then(okCoinData => {
    //     this.setState({
    //       okCoinData
    //     });
    //   });
    // }, 3000);

    // setInterval(() => {
    //   fetchCoinoneMockData().then(coinoneData => {
    //     this.setState({
    //       coinoneData
    //     });
    //   });
    // }, 3000);

    // setInterval(() => {
    //   fetchUpbitTicker().then(upbitData => {
    //     this.setState({
    //       upbitData
    //     });
    //   });
    // }, 3000);

    fetchCoinMarketCapData().then(marketCapData => {
      this.setState({
        marketCapData
      });
    });
  }

  handleSearch = value => {
    this.setState({
      dataSource: !value ? [] : [value, value + value, value + value + value]
    });
  };

  render() {
    const {
      currencyRate,
      bithumbData,
      binanceData,
      gateIoData,
      upbitData,
      okCoinData,
      coinoneData,
      marketCapData
    } = this.state;
    console.log(marketCapData);
    // setcompareData(bithumbData, binanceData);
    let testData = [
      setcompareData(bithumbData, binanceData),
      setcompareData(bithumbData, gateIoData),
      setcompareData(bithumbData, okCoinData),
      setcompareData(coinoneData, binanceData),
      setcompareData(coinoneData, gateIoData),
      setcompareData(coinoneData, okCoinData),
      setcompareData(upbitData, binanceData),
      setcompareData(upbitData, gateIoData),
      setcompareData(upbitData, okCoinData)
    ];

    return (
      <Layout className="app">
        <GlobalHeader />
        <StyledContent>
          <StyledRow gutter={16}>
            <Col xs={24} lg={4}>
              <Card
                title="환율정보"
                bordered={false}
                loading={currencyRate.length === 0 ? true : false}
              >
                <ExchangeRate currencyRate={currencyRate} />
              </Card>
            </Col>
            <Col xs={24} lg={8}>
              <Card
                title="마켓캡"
                bordered={false}
                loading={!window.CURRENCY_RATE ? true : false}
              >
                <MarketCap marketCapData={marketCapData} />
              </Card>
            </Col>
            <Col xs={24} lg={12}>
              <Card
                title="코인 거래소별 가격비교"
                bordered={false}
                // loading={true}
              >
                <BarChart width={150} height={40} data={sampleData}>
                  <Bar dataKey="uv" fill="#8884d8" />
                </BarChart>
              </Card>
            </Col>
          </StyledRow>
          <StyledRow gutter={16}>
            <Col xs={24} lg={16}>
              <CryptoContainer cryptoDataSet={testData} />
            </Col>
            <Col xs={24} lg={8}>
              <ChatContainer />
            </Col>
          </StyledRow>
        </StyledContent>
        <GlobalFooter />
      </Layout>
    );
  }
}

export default App;

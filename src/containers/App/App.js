// @flow
import React, { Component } from 'react';
import styled from 'styled-components';

import { Layout } from 'antd';
import { Card, Col, Row, AutoComplete } from 'antd';

import GlobalHeader from 'components/GlobalHeader';
import GlobalFooter from 'components/GlobalFooter';
import CryptoContainer from 'components/CryptoContainer';
import ChatContainer from 'components/ChatContainer';
import ExchangeRate from 'components/ExchangeRate';

import {
  fetchCurrencyRate,
  fetchBithumbMockData,
  fetchBinanceMockData,
  fetchGateIoMockData,
  fetchOkCoinMockData,
  fetchCoinoneMockData,
  fetchUpbitTicker,
  setcompareData
} from 'api';
import { initSocket, fetchTickerData } from 'helpers/socket';
import './App.css';
const { Content } = Layout;

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
  currencyRate: Array<mixed>
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
    currencyRate: []
  };
  componentDidMount() {
    // const socket = initSocket();
    // fetchTickerData(socket, 'binance');
    setInterval(() => {
      fetchBithumbMockData().then(bithumbData => {
        this.setState({
          bithumbData
        });
      });
    }, 3000);

    setInterval(() => {
      fetchBinanceMockData().then(binanceData => {
        this.setState({
          binanceData
        });
      });
    }, 3000);

    setInterval(() => {
      fetchGateIoMockData().then(gateIoData => {
        this.setState({
          gateIoData
        });
      });
    }, 3000);

    setInterval(() => {
      fetchOkCoinMockData().then(okCoinData => {
        this.setState({
          okCoinData
        });
      });
    }, 3000);

    setInterval(() => {
      fetchCoinoneMockData().then(coinoneData => {
        this.setState({
          coinoneData
        });
      });
    }, 3000);

    setInterval(() => {
      fetchUpbitTicker().then(upbitData => {
        this.setState({
          upbitData
        });
      });
    }, 3000);

    fetchCurrencyRate().then(currencyRate => {
      window.CURRENCY_RATE = Number(currencyRate[0].Rate);

      this.setState({
        currencyRate
      });
    });
  }

  render() {
    const {
      currencyRate,
      bithumbData,
      binanceData,
      gateIoData,
      upbitData,
      okCoinData,
      coinoneData
    } = this.state;
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
            <Col xs={24} lg={6}>
              <Card
                title="환율정보"
                bordered={false}
                loading={currencyRate.length === 0 ? true : false}
              >
                <ExchangeRate currencyRate={currencyRate} />
              </Card>
            </Col>
            <Col xs={24} lg={18}>
              <Card
                title="코인 거래소별 가격비교"
                extra={<AutoComplete />}
                bordered={false}
                loading={true}
              >
                Card content
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

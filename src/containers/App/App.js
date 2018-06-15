// @flow
import React, { Component } from 'react';
import styled from 'styled-components';
import { Layout } from 'antd';
import { Card, Col, Row, BackTop } from 'antd';

import { AuthConsumer } from 'containers/AuthProvider';

import GlobalHeader from 'components/GlobalHeader';
import GlobalFooter from 'components/GlobalFooter';
import CryptoContainer from 'components/CryptoContainer';
import ChatContainer from 'containers/ChatContainer';
import ExchangeRate from 'components/ExchangeRate';
import MarketCap from 'components/MarketCap';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
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
  { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
  { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
  { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
  { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
  { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
  { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
  { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
  { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
  { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
  { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
  { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
  { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
  { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
  { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
  { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
  { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
  { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
  { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 }
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
      console.log(currencyRate);
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

    // setcompareData(bithumbData, binanceData);
    let testData = [
      // setcompareData(bithumbData, binanceData),
      // setcompareData(bithumbData, gateIoData),
      // setcompareData(bithumbData, okCoinData),
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
                title="글로벌 암호화폐 현황"
                bordered={false}
                loading={!window.CURRENCY_RATE ? true : false}
              >
                {!isEmpty(marketCapData) && (
                  <MarketCap marketCapData={marketCapData} />
                )}
              </Card>
            </Col>
            <Col xs={24} lg={12}>
              <Card
                title="비트코인 거래소별 가격비교"
                bordered={false}
                // loading={true}
              >
                <ResponsiveContainer width="100%" aspect={12.5 / 3.0}>
                  <LineChart data={sampleData}>
                    <Line
                      type="monotone"
                      dataKey="pv"
                      stroke="#8884d8"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Card>
            </Col>
          </StyledRow>
          <StyledRow gutter={16}>
            <Col xs={24} lg={16}>
              <CryptoContainer cryptoDataSet={testData} />
            </Col>
            <Col xs={24} lg={8}>
              <AuthConsumer>
                {value => <ChatContainer {...value} />}
              </AuthConsumer>
            </Col>
          </StyledRow>
        </StyledContent>
        <GlobalFooter />
        <BackTop />
      </Layout>
    );
  }
}

export default App;

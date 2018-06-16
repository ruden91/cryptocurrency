// @flow
import React, { Component } from 'react';
import styled from 'styled-components';
import { Layout } from 'antd';
import { Card, Col, Row, BackTop } from 'antd';
import axios from 'axios';
import { AuthConsumer } from 'containers/AuthProvider';

import GlobalHeader from 'components/GlobalHeader';
import GlobalFooter from 'components/GlobalFooter';
import CryptoContainer from 'components/CryptoContainer';
import ChatContainer from 'containers/ChatContainer';
import ExchangeRate from 'components/ExchangeRate';
import CryptoWatch from 'containers/CryptoWatch';
import MarketcapChart from 'components/MarketcapChart';
import MarketCap from 'components/MarketCap';
import CryptoNews from 'components/CryptoNews';

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
import { isEmpty, flatten } from 'lodash';
import { database } from 'config/firebase';
import './App.css';
const { Content } = Layout;
const sampleData = [
  { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
  { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
  { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
  { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
  { name: 'Page E', uv: 1890, pv: 4800, aOptionmt: 2181 },
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
    standardExchanges: ['upbit', 'coinone', 'coinnest', 'bithumb'],
    selectedStandardExchanges: [],
    comparedExchanges: ['binance', 'okex', 'bittrex', 'bitfinex'],
    selectedComparedExchanges: [],
    binanceData: [],
    bithumbData: [],
    gateIoData: [],
    okexData: [],
    upbitData: [],
    okCoinData: [],
    coinoneData: [],
    currencyRate: [],
    dataSource: [],
    marketCapData: {},
    selectedExchange: '',
    selectedAssets: '',
    newsItems: []
  };
  componentDidMount() {
    const { standardExchanges, comparedExchanges } = this.state;
    this.setState({
      selectedStandardExchanges: standardExchanges,
      selectedComparedExchanges: comparedExchanges
    });

    database
      .ref('news/data')
      .once('value')
      .then(snap => {
        this.setState({
          newsItems: snap.val().map(item => item)
        });
      });

    fetchCurrencyRate().then(currencyRate => {
      window.CURRENCY_RATE = Number(currencyRate[0].value.replace(',', ''));
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

  handleCryptoFilter = (type, list) => {
    if (type === 'standard') {
      this.setState({
        selectedStandardExchanges: list
      });
    } else if (type === 'compare') {
      this.setState({
        selectedComparedExchanges: list
      });
    }
  };

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
      marketCapData,
      standardExchanges,
      comparedExchanges,
      selectedStandardExchanges,
      selectedComparedExchanges
    } = this.state;
    let testData = flatten(
      selectedStandardExchanges.map(sData => {
        return selectedComparedExchanges.map(cData => {
          return {
            standardExchange: sData,
            comparedExchange: cData,
            data: []
          };
        });
      })
    );

    // setcompareData(bithumbData, binanceData);
    // let testData = [
    //   // setcompareData(bithumbData, binanceData),
    //   // setcompareData(bithumbData, gateIoData),
    //   // setcompareData(bithumbData, okCoinData),
    //   setcompareData(coinoneData, binanceData),
    //   setcompareData(coinoneData, gateIoData),
    //   setcompareData(coinoneData, okCoinData),
    //   setcompareData(upbitData, binanceData),
    //   setcompareData(upbitData, gateIoData),
    //   setcompareData(upbitData, okCoinData)
    // ];
    return (
      <Layout className="app">
        <GlobalHeader />
        <StyledContent>
          <StyledRow gutter={16}>
            <Col xs={24} lg={6}>
              <StyledRow>
                {/* <Card
                title="환율정보"
                bordered={false}
                loading={currencyRate.length === 0 ? true : false}
              >
                <ExchangeRate currencyRate={currencyRate} />
              </Card> */}
                <Card
                  title="글로벌 암호화폐 현황"
                  bordered={false}
                  loading={!window.CURRENCY_RATE ? true : false}
                >
                  {!isEmpty(marketCapData) && (
                    <MarketCap marketCapData={marketCapData} />
                  )}
                </Card>
              </StyledRow>
              <StyledRow>
                <Card
                  title="거래소 공지"
                  bordered={false}
                  loading={this.state.newsItems.length === 0 ? true : false}
                >
                  <CryptoNews newsItems={this.state.newsItems} />
                </Card>
              </StyledRow>
            </Col>
            {/* <Col xs={24} lg={6}>
              <Card
                title="시총 점유율"
                bordered={false}
                // loading={currencyRate.length === 0 ? true : false}
              >
                <MarketcapChart />
              </Card>
            </Col> */}
            <Col xs={24} lg={18}>
              <Card
                title="Cryptowatch"
                bordered={false}
                // loading={true}
              >
                <CryptoWatch />
                {/* <ResponsiveContainer width="100%" aspect={12.5 / 3.0}>
                  <LineChart data={sampleData}>
                    <Line
                      type="monotone"
                      dataKey="pv"
                      stroke="#8884d8"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer> */}
              </Card>
            </Col>
          </StyledRow>
          <StyledRow gutter={16}>
            <Col xs={24} lg={16}>
              <CryptoContainer
                onHandleCryptoFilter={this.handleCryptoFilter}
                standardExchanges={standardExchanges}
                comparedExchanges={comparedExchanges}
                selectedStandardExchanges={selectedStandardExchanges}
                selectedComparedExchanges={selectedComparedExchanges}
                cryptoDataSet={testData}
              />
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

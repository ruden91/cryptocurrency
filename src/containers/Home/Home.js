// @flow
import io from 'socket.io-client';
import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { AuthConsumer } from 'containers/AuthProvider';
import { Layout } from 'antd';
import { Card, Col, Row, BackTop } from 'antd';

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

const { Content } = Layout;

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

const StyledContent = styled(Content)`
  padding: 20px;
`;

const StyledRow = styled(Row)`
  margin-bottom: 20px;
`;

export default class Home extends Component<{}, State> {
  constructor() {
    super();
    this.socket = io.connect(
      'https://api.doondoony.com',
      { path: '/crypto/socket.io' }
    );
  }
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

    fetchCoinMarketCapData().then(marketCapData => {
      this.setState({
        marketCapData
      });
    });

    // socket.on('connect', data => {
    //   console.log(data)
    // })

    this.socket.on('UPBIT', data => {
      console.log('upbit');
      console.log(data);
    });

    this.socket.on('BINANCE', data => {
      console.log('binance');
      console.log(data);
    });
  }
  componentWillUnmount() {
    this.socket.off('UPBIT');
    this.socket.off('BINANCE');
    console.log('componentWillUnmount');
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
    return (
      <StyledContent>
        <Helmet>
          <link
            rel="canonical"
            href="https://cryptocurrency-c7083.firebaseapp.com/"
          />
          <title>CryptoCheck | HOME</title>
          <meta
            name="description"
            content="암호화폐 코리아 프리미엄 조회사이트"
          />
        </Helmet>
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
            <AuthConsumer>{value => <ChatContainer {...value} />}</AuthConsumer>
          </Col>
        </StyledRow>
      </StyledContent>
    );
  }
}

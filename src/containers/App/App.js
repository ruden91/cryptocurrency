// @flow
import React, { Component } from 'react';
import styled from 'styled-components';

import { Layout } from 'antd';
import { Card, Col, Row } from 'antd';

import GlobalHeader from 'components/GlobalHeader';
import GlobalFooter from 'components/GlobalFooter';
import CryptoContainer from 'components/CryptoContainer';
import ExchangeRate from 'components/ExchangeRate';

import { fetchCurrencyRate } from 'api';
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
  okexData: Array<{}>,
  coinoneData: Array<{}>,
  currencyRate: Array<mixed>
};

class App extends Component<{}, State> {
  state = {
    binanceData: [],
    bithumbData: [],
    okexData: [],
    coinoneData: [],
    currencyRate: []
  };
  componentDidMount() {
    // const socket = initSocket();
    // fetchTickerData(socket, 'binance');
    fetchCurrencyRate().then(currencyRate => {
      this.setState({
        currencyRate
      });
    });
  }

  render() {
    const { currencyRate } = this.state;
    return (
      <Layout className="app">
        <GlobalHeader />
        <StyledContent>
          <StyledRow gutter={16}>
            <Col xs={24} lg={6}>
              <Card title="환율정보" bordered={false}>
                <ExchangeRate currencyRate={currencyRate} />
              </Card>
            </Col>
            <Col xs={24} lg={18}>
              <Card title="Card title" bordered={false}>
                Card content
              </Card>
            </Col>
          </StyledRow>
          <StyledRow gutter={16}>
            <Col xs={24} lg={18}>
              <CryptoContainer />
            </Col>
            <Col xs={24} lg={6}>
              <p>hello</p>
            </Col>
          </StyledRow>
        </StyledContent>
        <GlobalFooter />
      </Layout>
    );
  }
}

export default App;

// @flow
import React, { Component } from 'react';
import { Layout } from 'antd';
import GlobalHeader from 'components/GlobalHeader';
import GlobalFooter from 'components/GlobalFooter';
import CryptoContainer from 'components/CryptoContainer';
import ExchangeRate from 'components/ExchangeRate';
import { Card, Col, Row } from 'antd';
// import { initSocket, fetchTickerData } from 'helpers/socket';
import './App.css';
const { Content } = Layout;

type State = {
  binanceData: Array<{}>,
  bithumbData: Array<{}>,
  okexData: Array<{}>,
  coinoneData: Array<{}>
};

class App extends Component<{}, State> {
  state = {
    binanceData: [],
    bithumbData: [],
    okexData: [],
    coinoneData: []
  };
  componentDidMount() {
    // const socket = initSocket();
    // fetchTickerData(socket, 'binance');
  }
  render() {
    return (
      <Layout className="app">
        <GlobalHeader />
        <Content style={{ padding: '20px' }}>
          <Row gutter={16}>
            <Col xs={24} sm={12} lg={6}>
              <Card title="Card title" bordered={false}>
                <ExchangeRate />
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card title="Card title" bordered={false}>
                Card content
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card title="Card title" bordered={false}>
                Card content
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card title="Card title" bordered={false}>
                Card content
              </Card>
            </Col>
          </Row>
          <Row>
            <Col>
              <CryptoContainer />
            </Col>
          </Row>
        </Content>
        <GlobalFooter />
      </Layout>
    );
  }
}

export default App;

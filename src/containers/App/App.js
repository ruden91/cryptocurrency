// @flow
import React, { Component } from 'react';
import { Layout } from 'antd';
import Header from 'components/Header';
import CryptoContainer from 'components/CryptoContainer';
import ExchangeRate from 'components/ExchangeRate';
import { Card, Col, Row } from 'antd';
import Footer from 'components/Footer';
import { initSocket, fetchTickerData } from 'helpers/socket';
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
    fetch('http://earthquake.kr/exchange').then(res => {
      console.log(res);
    });
    // const socket = initSocket();
    // fetchTickerData(socket, 'binance');
  }
  render() {
    return (
      <Layout className="app">
        <Header />
        <Content style={{ padding: '0 50px' }}>
          <Row gutter={16}>
            <Col span={8}>
              <Card title="Card title" bordered={false}>
                <ExchangeRate />
              </Card>
            </Col>
            <Col span={8}>
              <Card title="Card title" bordered={false}>
                Card content
              </Card>
            </Col>
            <Col span={8}>
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
        <Footer />
      </Layout>
    );
  }
}

export default App;

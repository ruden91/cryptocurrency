import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';
import Header from 'components/Header';
import Footer from 'components/Footer';
import { Spin } from 'antd';
import 'containers/App.css';
// Making the App component
class App extends Component {
  endpoint = 'https://2b2b904f.ngrok.io';
  state = {
    binanceData: [],
    bithumbData: [],
    okexData: [],
    coinoneData: []
  };
  componentDidMount() {
    const socket = socketIOClient(this.endpoint);
    socket.on('binance', data => {
      const binanceData = JSON.parse(data);
      this.setState({
        binanceData
      });
    });
    socket.on('bithumb', data => {
      const bithumb = JSON.parse(data);
      let bithumbData = [];
      if (bithumb.status === '0000') {
        for (data in bithumb.data) {
          bithumbData.push({
            ...bithumb.data[data],
            name: data
          });
        }
      }
      this.setState({
        bithumbData
      });
    });
    socket.on('okex', data => {
      const okexData = JSON.parse(data);

      this.setState({
        okexData: okexData.data
      });
    });
    socket.on('coinone', data => {
      const coinoneData = JSON.parse(data);
      const tempData = [];
      for (data in coinoneData) {
        if (typeof coinoneData[data] === 'object') {
          tempData.push(coinoneData[data]);
        }
      }
      this.setState({
        coinoneData: tempData
      });
    });
  }
  render() {
    const { binanceData, bithumbData, okexData, coinoneData } = this.state;
    return (
      <div className="app">
        <Header />
        {binanceData.length === 0 && <Spin />}
        {binanceData.length > 0 && (
          <div>
            <h1>바이낸스</h1>
            <pre>{JSON.stringify(binanceData, null, 4)}</pre>
          </div>
        )}
        {bithumbData.length > 0 && (
          <div>
            <h1>빗썸</h1>
            <pre>{JSON.stringify(bithumbData, null, 4)}</pre>
          </div>
        )}
        {okexData.length > 0 && (
          <div>
            <h1>오케이코인</h1>
            <pre>{JSON.stringify(okexData, null, 4)}</pre>
          </div>
        )}
        {coinoneData.length > 0 && (
          <div>
            <h1>코인원</h1>
            <pre>{JSON.stringify(coinoneData, null, 4)}</pre>
          </div>
        )}
        <Footer />
      </div>
    );
  }
}

export default App;

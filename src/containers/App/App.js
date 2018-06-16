// @flow
import React, { Component } from 'react';
import { Layout } from 'antd';
import { BackTop } from 'antd';

import { Switch, Route } from 'react-router-dom';
import GlobalHeader from 'components/GlobalHeader';
import GlobalFooter from 'components/GlobalFooter';
import Home from 'containers/Home';
import Donate from 'containers/Donate';
import Goodnews from 'containers/Goodnews';
import ExchangeRanking from 'containers/ExchangeRanking';
import NoMatch from 'components/NoMatch';
import './App.css';

import axios from 'axios';
class App extends Component {
  componentDidMount() {
    this.fetchHozae();
  }

  async fetchHozae() {
    let res = await axios.get(
      'https://urlreq.appspot.com/req?method=GET&url=http://hozaebox.com/bbs/board.php?bo_table=hozae'
    );
    let div = document.createElement('div');

    div.innerHTML = res.data;
    console.log(div);
  }
  render() {
    return (
      <Layout className="app">
        <GlobalHeader />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/donate" component={Donate} />
          <Route path="/goodnews" component={Goodnews} />
          <Route path="/exchange-ranking" component={ExchangeRanking} />
          <Route component={NoMatch} />
        </Switch>
        <GlobalFooter />
        <BackTop />
      </Layout>
    );
  }
}

export default App;

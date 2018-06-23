// @flow
import React, { Component } from 'react';
import { Layout, BackTop } from 'antd';

import { Switch, Route } from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars';
import GlobalHeader from 'components/GlobalHeader';
import GlobalFooter from 'components/GlobalFooter';
import Home from 'containers/Home';
import Donate from 'containers/Donate';
import Goodnews from 'containers/Goodnews';
import ExchangeRanking from 'containers/ExchangeRanking';
import IcoInfo from 'containers/IcoInfo';
import NoMatch from 'components/NoMatch';
import './App.css';

class App extends Component {
  render() {
    return (
      <Scrollbars autoHeight autoHeightMin="100vh">
        <Layout className="app">
          <GlobalHeader />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/donate" component={Donate} />
            <Route path="/goodnews" component={Goodnews} />
            <Route path="/exchange-ranking" component={ExchangeRanking} />
            <Route path="/ico-info" component={IcoInfo} />
            <Route component={NoMatch} />
          </Switch>
          <GlobalFooter />
          <BackTop />
        </Layout>
      </Scrollbars>
    );
  }
}

export default App;

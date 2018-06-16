// @flow
import React, { Component } from 'react';
import { Layout } from 'antd';
import { Card, Col, Row, BackTop } from 'antd';

import { Switch, Route } from 'react-router-dom';
import GlobalHeader from 'components/GlobalHeader';
import GlobalFooter from 'components/GlobalFooter';
import Home from 'containers/Home';
import Donate from 'containers/Donate';
import './App.css';

class App extends Component {
  render() {
    return (
      <Layout className="app">
        <GlobalHeader />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/donate" component={Donate} />
          {/* <Route path="/schedule" component={Schedule} /> */}
        </Switch>
        <GlobalFooter />
        <BackTop />
      </Layout>
    );
  }
}

export default App;

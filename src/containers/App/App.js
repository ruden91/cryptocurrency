// @flow
import React, { Component } from 'react';
import { Layout } from 'antd';
import { BackTop } from 'antd';

import { Switch, Route } from 'react-router-dom';
import GlobalHeader from 'components/GlobalHeader';
import GlobalFooter from 'components/GlobalFooter';
import Home from 'containers/Home';
import Donate from 'containers/Donate';
import NoMatch from 'components/NoMatch';
import './App.css';

class App extends Component {
  render() {
    return (
      <Layout className="app">
        <GlobalHeader />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/donate" component={Donate} />
          <Route component={NoMatch} />
          {/* <Route path="/schedule" component={Schedule} /> */}
        </Switch>
        <GlobalFooter />
        <BackTop />
      </Layout>
    );
  }
}

export default App;

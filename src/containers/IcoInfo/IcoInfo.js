import React, { Component } from 'react';
import styled from 'styled-components';
import IcoInfoList from 'containers/IcoInfoList';
import { Link, Route } from 'react-router-dom';

const StyledPage = styled.div`
  padding: 25px 50px;
`;

const StyledLink = styled(Link)`
  display: inline-block;
  height: 100%;
  margin: 0 32px 0 0;
  padding: 12px 16px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  position: relative;
  -webkit-transition: color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition: color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  cursor: pointer;
  text-decoration: none;
  text-transform: uppercase;
`;
export default class IcoInfo extends Component {
  state = {
    tabs: ['coinhills', 'coinjinja', 'trackico']
  };
  render() {
    const { tabs } = this.state;
    return (
      <StyledPage>
        {tabs.map(item => (
          <StyledLink to={`/ico-info/${item}`}>{item}</StyledLink>
        ))}

        <Route path="/ico-info/:ico" component={IcoInfoList} />
      </StyledPage>
    );
  }
}

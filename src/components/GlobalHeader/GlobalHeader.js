import { Layout, Menu } from 'antd';
import React from 'react';
import styled from 'styled-components';
import { Link, withRouter } from 'react-router-dom';
const { Header } = Layout;
const StyledGlobalHeader = styled(Header)`
  padding: 0 20px;
  .logo {
    color: #fff;
    line-height: 31px;
    text-align: center;
    text-transform: uppercase;
    font-size: 12px;
  }
`;

const GlobalHeader = ({ location }) => (
  <StyledGlobalHeader>
    <div className="logo">CryptoCheck</div>
    <Menu
      theme="dark"
      mode="horizontal"
      defaultSelectedKeys={[location.pathname]}
      style={{ lineHeight: '64px' }}
    >
      <Menu.Item key="/">
        <Link to="/">Home</Link>
      </Menu.Item>
      <Menu.Item key="/donate">
        <Link to="/donate">Donate</Link>
      </Menu.Item>
      <Menu.Item key="3">3</Menu.Item>
    </Menu>
  </StyledGlobalHeader>
);

export default withRouter(GlobalHeader);

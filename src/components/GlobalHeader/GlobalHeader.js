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
        <Link to="/">메인</Link>
      </Menu.Item>
      <Menu.Item key="/goodnews">
        <Link to="/goodnews">호재정보</Link>
      </Menu.Item>
      <Menu.Item key="/exchange-ranking">
        <Link to="/exchange-ranking">거래소순위</Link>
      </Menu.Item>
      <Menu.Item key="/ico-info">
        <Link to="/ico-info">ICO정보</Link>
      </Menu.Item>
      <Menu.Item key="/donate">
        <Link to="/donate">기부</Link>
      </Menu.Item>
    </Menu>
  </StyledGlobalHeader>
);

export default withRouter(GlobalHeader);

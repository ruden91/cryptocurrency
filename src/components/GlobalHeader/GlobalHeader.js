import { Layout, Menu } from 'antd';
import React from 'react';
import styled from 'styled-components';
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

const GlobalHeader = () => (
  <StyledGlobalHeader>
    <div className="logo">CryptoCheck</div>
    <Menu
      theme="dark"
      mode="horizontal"
      // defaultSelectedKeys={['2']}
      style={{ lineHeight: '64px' }}
    >
      {/* <Menu.Item key="1">1</Menu.Item>
      <Menu.Item key="2">2</Menu.Item>
      <Menu.Item key="3">3</Menu.Item> */}
    </Menu>
  </StyledGlobalHeader>
);

export default GlobalHeader;

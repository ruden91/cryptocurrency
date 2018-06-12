import { Layout, Menu } from 'antd';
import React from 'react';
import styled from 'styled-components';
const { Header } = Layout;

const StyledGlobalHeader = styled(Header)``;

const GlobalHeader = () => (
  <StyledGlobalHeader>
    <div className="logo" />
    <Menu
      theme="dark"
      mode="horizontal"
      defaultSelectedKeys={['2']}
      style={{ lineHeight: '64px' }}
    >
      <Menu.Item key="1">1</Menu.Item>
      <Menu.Item key="2">2</Menu.Item>
      <Menu.Item key="3">3</Menu.Item>
    </Menu>
  </StyledGlobalHeader>
);

export default GlobalHeader;

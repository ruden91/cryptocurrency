import { Layout } from 'antd';
import React from 'react';
import styled from 'styled-components';
const { Footer } = Layout;

const StyledGlobalFooter = styled(Footer)`
  background-color: #fff;
  text-align: center;
  min-height: 200px;
  padding: 30px;
`;

const GlobalFooter = () => (
  <StyledGlobalFooter>
    <a href="https://cryptocurrency-c7083.firebaseapp.com/#">CryptoCheck</a>{' '}
    ©2018 Created by{' '}
    <a href="https://ruden91.github.io/" target="_blank">
      FERuden
    </a>
  </StyledGlobalFooter>
);

export default GlobalFooter;

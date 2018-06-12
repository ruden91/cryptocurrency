import { Layout } from 'antd';
import React from 'react';
import styled from 'styled-components';
const { Footer } = Layout;

const StyledGlobalFooter = styled(Footer)`
  text-align: center;
`;

const GlobalFooter = () => (
  <StyledGlobalFooter>CryptoCheck ©2018 Created by Ruden</StyledGlobalFooter>
);

export default GlobalFooter;

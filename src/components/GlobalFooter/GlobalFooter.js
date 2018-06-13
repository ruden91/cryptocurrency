import { Layout } from 'antd';
import React from 'react';
import styled from 'styled-components';
const { Footer } = Layout;

const StyledGlobalFooter = styled(Footer)`
  text-align: center;
`;

const GlobalFooter = () => (
  <StyledGlobalFooter>
    <a href="#">CryptoCheck</a> ©2018 Created by <a href="#">Ruden</a>
  </StyledGlobalFooter>
);

export default GlobalFooter;

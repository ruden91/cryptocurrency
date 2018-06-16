import React from 'react';
import styled from 'styled-components';

const StyledNoMatch = styled.div`
  text-align: center;
  max-width: 320px;
  margin: 0 auto;
  padding: 300px 0;
`;
const NoMatch = () => (
  <StyledNoMatch>
    <h1>CryptoCheck</h1>
    <h2>404. That’s an error.</h2>
    <p>The requested URL was not found on this server. That’s all we know.</p>
  </StyledNoMatch>
);

export default NoMatch;

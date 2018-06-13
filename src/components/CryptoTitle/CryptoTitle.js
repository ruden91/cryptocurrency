import React from 'react';
import styled from 'styled-components';

const StyledCryptoTitle = styled.div`
  display: inline-block;
  margin-right: 40px;
  margin-bottom: 20px;
  img {
    width: 40px;
    height: 40px;
    display: inline-block;
  }

  p {
    position: relative;
    display: inline-block;
    margin-left: 5px;
    white-space: nowrap;
    span {
      text-transform: capitalize;
      font-weight: 500;
      font-size: 18px;
    }

    em {
      position: absolute;
      width: 100%;
      top: 24px;
      font-size: 12px;
      left: 30px;
    }
  }
`;
const CryptoTitle = ({ title, description }) => (
  <StyledCryptoTitle>
    <img src={require(`images/exchangeIcon/${title}.svg`)} alt={title} />
    <p>
      <span>{title}</span>
      <em>{description}</em>
    </p>
  </StyledCryptoTitle>
);

export default CryptoTitle;

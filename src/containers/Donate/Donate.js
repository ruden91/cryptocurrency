import React, { Component } from 'react';
import styled from 'styled-components';
import { Col, Row, Layout, Button, message } from 'antd';
import Clipboard from 'react-clipboard.js';
const { Content } = Layout;

const StyledContent = styled(Content)`
  margin-top: 20px;
  margin-bottom: 20px;
`;
const StyledDonateCard = styled.div`
  text-align: center;
  margin: 15px 0;
  img {
    width: 40%;
    margin: 15px 0;
  }
  p {
    font-size: 18px;
    margin-bottom: 10px;
    strong {
      text-transform: uppercase;
    }
  }
  small {
    display: block;
  }
`;
const StyledButton = styled(Clipboard)`
  margin-top: 20px;
  touch-action: manipulation;
  cursor: pointer;
  background-image: none;
  border: 1px solid transparent;
  white-space: nowrap;
  padding: 0 15px;
  font-size: 14px;
  border-radius: 4px;
  height: 32px;
  user-select: none;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  position: relative;
  color: rgba(0, 0, 0, 0.65);
  background-color: #fff;
  border-color: #d9d9d9;

  &:hover {
    color: #40a9ff;
    background-color: #fff;
    border-color: #40a9ff;
  }
`;
const donateData = [
  {
    symbol: 'btc',
    name: '비트코인',
    account: '14zgajXoCmwtxFCDp9qt56AbAHtauvq7JW'
  },
  {
    symbol: 'eth',
    name: '이더리움',
    account: '0xa25fd0e93582c714fa32c65446847e1f9f878a73'
  },
  {
    symbol: 'qtum',
    name: '퀀텀',
    account: 'QiD2BBTvTnWnvD5hC2kSqfGXJ6ouzKCSY8'
  },
  {
    symbol: 'strat',
    name: '스트라티스',
    account: 'SU7ZmncuxeVvK6MPN8QbTMSyb1ubopupwo'
  },
  {
    symbol: 'icx',
    name: '아이콘',
    account: '0xa25fd0e93582c714fa32c65446847e1f9f878a73'
  },
  {
    symbol: 'kmd',
    name: '코모도',
    account: 'RXGLkeqmzFJuPQuZSMoTZbQJZoM4qmtSBN'
  },
  {
    symbol: 'trx',
    name: '트론',
    account: '0x7a56394c52cd4319d0735394d43c7423fc48cc34'
  },
  {
    symbol: 'ont',
    name: '온톨로지',
    account: 'AGerKfpUnFF5oLor5wWaqFBay3KetWktTi'
  }
];
export default class Donate extends Component {
  handleSuccess = () => {
    message.success('성공적으로 복사되었습니다.');
  };
  render() {
    return (
      <StyledContent>
        <Row gutter={16}>
          {donateData.map(item => (
            <Col xs={24} sm={12} md={8} lg={6}>
              <StyledDonateCard>
                <img
                  src={require(`images/cryptoIcon/${item.symbol}.svg`)}
                  alt={`${item.name} 아이콘`}
                />
                <p>
                  <strong>{item.symbol}</strong>
                  ({item.name})
                </p>
                <small>{item.account}</small>

                <StyledButton
                  data-clipboard-text={item.account}
                  onSuccess={this.handleSuccess}
                >
                  Copy
                </StyledButton>
              </StyledDonateCard>
            </Col>
          ))}
        </Row>
      </StyledContent>
    );
  }
}

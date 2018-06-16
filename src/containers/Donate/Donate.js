import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Col, Row, Layout, Button, message, Divider } from 'antd';
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
  },
  {
    symbol: 'lsk',
    name: '리스크',
    account: '8749211254413489053L'
  },
  {
    symbol: 'dash',
    name: '대시',
    account: 'XcoBA2bYufQajUa1WQFJFz4LkyYcSvjsAp'
  },
  {
    symbol: 'xvg',
    name: '버지',
    account: 'DPMxz2NAn4QuUEjoQpKiAkUVBpGVV8iSQz'
  },
  {
    symbol: 'salt',
    name: '솔트',
    account: '0x7a56394c52cd4319d0735394d43c7423fc48cc34'
  },
  {
    symbol: 'btg',
    name: '비트코인골드',
    account: 'AUPswvigdaAU28LE1MVDU2u8Zsz6MVtqW4'
  },
  {
    symbol: 'storm',
    name: '스톰',
    account: '0x7a56394c52cd4319d0735394d43c7423fc48cc34'
  },
  {
    symbol: 'omg',
    name: '오미세고',
    account: '0x7a56394c52cd4319d0735394d43c7423fc48cc34'
  },
  {
    symbol: 'etc',
    name: '이더리움클래식',
    account: '0x63a515fa49561a12793927e4cd06291bd423d8f9'
  },
  {
    symbol: 'tix',
    name: '블록틱스',
    account: '0x7a56394c52cd4319d0735394d43c7423fc48cc34'
  },
  {
    symbol: 'neo',
    name: '네오',
    account: 'AGerKfpUnFF5oLor5wWaqFBay3KetWktTi'
  },
  {
    symbol: 'ltc',
    name: '라이트코인',
    account: '32SSGTwXrW6q8NV1yhJuHezHwQxahwzD1n'
  },
  {
    symbol: 'dcr',
    name: '디크레드',
    account: 'DshU8xKECTbTnobWg5JZ19iKKKswegknPdu'
  },
  {
    symbol: 'wax',
    name: '왁스',
    account: '0x7a56394c52cd4319d0735394d43c7423fc48cc34'
  },
  {
    symbol: 'pay',
    name: '텐엑스페이토큰',
    account: '0x7a56394c52cd4319d0735394d43c7423fc48cc34'
  },
  {
    symbol: 'pivx',
    name: '피벡스',
    account: 'D8d7yueW3K855k71avC7DmKXgFYekUBbue'
  },
  {
    symbol: 'zil',
    name: '질리카',
    account: '0x7a56394c52cd4319d0735394d43c7423fc48cc34'
  },
  {
    symbol: 'zec',
    name: '지캐시',
    account: 't1QdvjvXp6s1N91ciMaYGi8fM8EPf6QGF8h'
  },
  {
    symbol: 'zrx',
    name: '제로엑스',
    account: '0x7a56394c52cd4319d0735394d43c7423fc48cc34'
  },
  {
    symbol: 'gto',
    name: '기프토',
    account: '0x7a56394c52cd4319d0735394d43c7423fc48cc34'
  },
  {
    symbol: 'mco',
    name: '모나코',
    account: '0x7a56394c52cd4319d0735394d43c7423fc48cc34'
  }
];
export default class Donate extends Component {
  handleSuccess = () => {
    message.success('성공적으로 복사되었습니다.');
  };
  render() {
    return (
      <StyledContent>
        <Helmet>
          <link
            rel="canonical"
            href="https://cryptocurrency-c7083.firebaseapp.com/#/donate"
          />
          <title>CryptoCheck | DONATE</title>
          <meta
            name="description"
            content="암호화폐 코리아 프리미엄 조회사이트"
          />
        </Helmet>
        <Row gutter={16}>
          <Divider orientation="left">Donation</Divider>
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

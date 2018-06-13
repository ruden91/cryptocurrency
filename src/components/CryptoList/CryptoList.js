import React, { Component } from 'react';
import { Table } from 'antd';
import styled from 'styled-components';

const StyledCryptoList = styled.div`
  margin-bottom: 20px;
`;
export default class CryptoList extends Component {
  render() {
    const { comparedExchange, standardExchange, data } = this.props;

    const columns = [
      {
        title: '코인',
        dataIndex: 'name',
        key: 'name',
        render: text => {
          let name = text.toLowerCase();
          return (
            <span>
              <img
                src={require(`images/cryptoIcon/${name}.svg`)}
                alt="crpyto"
                style={{ marginRight: '5px' }}
              />
              {text}
            </span>
          );
        }
      },
      {
        title: `${comparedExchange}(BTC)`,
        dataIndex: 'btc_price',
        key: 'btc_price'
      },
      {
        title: `${comparedExchange}($)`,
        dataIndex: 'dollar_price',
        key: 'dollar_price'
      },
      {
        title: `${comparedExchange}(₩)`,
        dataIndex: 'diffrence',
        key: 'diffrence'
      },
      {
        title: `${standardExchange}(₩)`,
        dataIndex: 'krw_price',
        key: 'krw_price'
      },
      // {
      //   title: 'BTC차액(₩)',
      //   dataIndex: 'premium_percent',
      //   key: 'premium_percent'
      // },
      {
        title: '김치프리미엄(₩)',
        dataIndex: 'premium',
        key: 'premium'
      }
    ];
    return (
      <StyledCryptoList>
        <Table
          locale={{
            emptyText: '데이터를 로딩하고 있습니다.'
          }}
          pagination={{ position: 'none' }}
          columns={columns}
          dataSource={data}
        />
      </StyledCryptoList>
    );
  }
}

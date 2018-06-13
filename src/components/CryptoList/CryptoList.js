import React from 'react';
import { Table } from 'antd';

const testData = [
  {
    key: '1',
    coin: 'BTC',
    compareBTC: 1,
    compareDolar: 1,
    compareWon: 1,
    standardWon: 1,
    BTCWon: 1,
    kimchipremium: 1
  },
  {
    key: '1',
    coin: 'QTUM',
    compareBTC: 1,
    compareDolar: 1,
    compareWon: 1,
    standardWon: 1,
    BTCWon: 1,
    kimchipremium: 1
  },
  {
    key: '1',
    coin: 'ADA',
    compareBTC: 1,
    compareDolar: 1,
    compareWon: 1,
    standardWon: 1,
    BTCWon: 1,
    kimchipremium: 1
  },
  {
    key: '1',
    coin: 'ARDR',
    compareBTC: 1,
    compareDolar: 1,
    compareWon: 1,
    standardWon: 1,
    BTCWon: 1,
    kimchipremium: 1
  }
];
const CryptoList = () => {
  const columns = [
    {
      title: '코인',
      dataIndex: 'coin',
      key: 'coin',
      render: text => (
        <span>
          <i
            className={`ci-${text.toLowerCase()} ${text.toLowerCase()}-color`}
          />
          {text}
        </span>
      )
    },
    {
      title: 'compare(BTC)',
      dataIndex: 'compareBTC',
      key: 'compareBTC'
    },
    {
      title: 'compare($)',
      dataIndex: 'compareDolar',
      key: 'compareDolar'
    },
    {
      title: 'compare(₩)',
      dataIndex: 'compareWon',
      key: 'compareWon'
    },
    {
      title: 'standard(₩)',
      dataIndex: 'standardWon',
      key: 'standardWon'
    },
    {
      title: 'BTC차액(₩)',
      dataIndex: 'BTCWon',
      key: 'BTCWon'
    },
    {
      title: '김치프리미엄(₩)',
      dataIndex: 'kimchipremium',
      key: 'kimchipremium'
    }
  ];

  return (
    <div>
      <Table
        pagination={{ position: 'none' }}
        columns={columns}
        dataSource={testData}
      />
    </div>
  );
};

export default CryptoList;

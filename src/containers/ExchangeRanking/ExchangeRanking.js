import React, { Component } from 'react';
import { Tabs, List, Avatar, Spin, Icon, Tooltip } from 'antd';
import { database } from 'config/firebase';
import styled from 'styled-components';
import { map, isEmpty } from 'lodash';
import Bar from 'components/charts/bar';
const TabPane = Tabs.TabPane;
const antIcon = <Icon type="loading" style={{ fontSize: 40 }} spin />;
const StyledExchangeRanking = styled.div`
  position: relative;
  min-height: 70vh;
  padding: 15px 0;
  h2 {
    margin-top: 20px;
  }
  h2,
  h3 {
    text-align: center;
  }
  .ant-tabs-tabpane {
    padding: 0 20px;
  }

  p {
    margin: 0;
    line-height: 55px;
  }

  .exchange-ranking__portion {
    display: inline-block;
    white-space: nowrap;
    line-height: 55px;
  }
`;
const StyledSpin = styled.div`
  position: absolute;
  z-index: 1;
  top: 50%;
  left: 50%;
  text-align: center;
  transform: translate(-50%, -50%);
  width: 320px;
`;
export default class ExchangeRanking extends Component {
  state = {
    items: {},
    tabItems: []
  };
  componentDidMount() {
    database
      .ref('exchangeRanking')
      .once('value')
      .then(snap => {
        const items = snap.val().data;
        const tabItems = map(
          items,
          item =>
            item.hasOwnProperty('altVolume')
              ? item.altVolume.split(' ')[2]
              : '전체'
        );
        this.setState({ items, tabItems });
      });
  }
  render() {
    const { items, tabItems } = this.state;

    return (
      <StyledExchangeRanking>
        {isEmpty(items) && (
          <StyledSpin>
            <Spin indicator={antIcon} />
          </StyledSpin>
        )}
        {!isEmpty(items) && (
          <Tabs defaultActiveKey={tabItems[0]}>
            {map(items, (item, index) => {
              return (
                <TabPane tab={tabItems[index]} key={tabItems[index]}>
                  <h2>{tabItems[index]} 거래소 거래량 순위</h2>
                  <h3>
                    24시간 거래량 : {item.volume} {item.altVolume}
                  </h3>
                  <List
                    itemLayout="horizontal"
                    dataSource={item.data}
                    renderItem={(data, index) => (
                      <List.Item>
                        <List.Item.Meta
                          avatar={
                            <Avatar
                              size="large"
                              src={require(`images/hillsIcon/${data.name
                                .toLowerCase()
                                .replace(/\.|\s/g, '-')}.png`)}
                            />
                          }
                          title={<a href="javascript:;">{data.name}</a>}
                          description={
                            <Tooltip placement="rightTop" title={data.altCoin}>
                              {data.info.market}개의 마켓 및 {data.info.coin}개
                              코인
                            </Tooltip>
                          }
                        />
                        <p
                          style={{
                            color: `${index === 0 ? '#1890ff' : ''}`,
                            'font-size': `${index === 0 ? '20px' : ''}`
                          }}
                        >
                          {data.volume}
                        </p>
                        <p
                          style={{
                            color: `${index === 0 ? '#1890ff' : ''}`,
                            'font-size': `${index === 0 ? '20px' : ''}`
                          }}
                        >
                          {data.rank}
                        </p>
                        <div
                          style={{
                            width: '400px',
                            padding: '0 15px',
                            position: 'relative',
                            top: '2px'
                          }}
                        >
                          <Bar
                            maxValue={parseFloat(
                              item.data[0].volume.replace(/,/g, '')
                            )}
                            value={parseFloat(data.volume.replace(',', ''))}
                          />
                        </div>
                        <span className="exchange-ranking__portion">
                          {data.portion}
                        </span>
                      </List.Item>
                    )}
                  />
                </TabPane>
              );
            })}
          </Tabs>
        )}
      </StyledExchangeRanking>
    );
  }
}

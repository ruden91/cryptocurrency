import React, { Component } from 'react';
import { Tabs, List, Avatar, Spin, Icon, Tooltip } from 'antd';
import { database } from 'config/firebase';
import styled from 'styled-components';
import { map, isEmpty } from 'lodash';
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
                    renderItem={item => (
                      <List.Item>
                        <List.Item.Meta
                          avatar={
                            <Avatar
                              src={require(`images/hillsIcon/${item.name
                                .toLowerCase()
                                .replace(/\.|\s/g, '-')}.png`)}
                            />
                          }
                          title={<a href="https://ant.design">{item.name}</a>}
                          description={
                            <Tooltip placement="rightTop" title={item.altCoin}>
                              {item.info.market}개의 마켓 및 {item.info.coin}개
                              코인
                            </Tooltip>
                          }
                        />
                        {item.volume}
                        <br />
                        {item.portion}
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

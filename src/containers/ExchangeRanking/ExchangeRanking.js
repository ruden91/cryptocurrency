import React, { Component } from 'react';
import { Tabs, List, Avatar } from 'antd';
import { database } from 'config/firebase';
import styled from 'styled-components';
import { map } from 'lodash';
const TabPane = Tabs.TabPane;

const StyledExchangeRanking = styled.div`
  padding: 15px 0;
  h2,
  h3 {
    text-align: center;
  }
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
        <Tabs defaultActiveKey={tabItems[0]}>
          {map(items, (item, index) => {
            console.log(item);
            return (
              <TabPane tab={tabItems[index]} key={tabItems[index]}>
                <h2>{tabItems[index]} 거래소 거래량 순위</h2>
                <h3>
                  {item.volume} {item.altVolume}
                </h3>
                <List
                  itemLayout="horizontal"
                  dataSource={item.data}
                  renderItem={item => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar />}
                        title={<a href="https://ant.design">{item.name}</a>}
                        description={`${item.info.market}개의 마켓 및 ${
                          item.info.coin
                        }개 코인`}
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
      </StyledExchangeRanking>
    );
  }
}

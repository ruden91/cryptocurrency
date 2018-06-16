import React, { Component } from 'react';
import styled from 'styled-components';
import { database } from 'config/firebase';
import { map, isEmpty } from 'lodash';
import { List, Avatar, Tabs, Spin, Icon } from 'antd';
const TabPane = Tabs.TabPane;

const StyledGoodnews = styled.div`
  padding: 20px;
`;

const antIcon = <Icon type="loading" style={{ fontSize: 40 }} spin />;
const StyledSpin = styled.div`
  max-width: 320px;
  padding: 250px;
  margin: 0 auto;
`;
export default class Goodnews extends Component {
  state = {
    goodnewsItems: {}
  };

  componentDidMount() {
    console.log('render');
    database
      .ref('hozae')
      .once('value')
      .then(snap => {
        this.setState({
          goodnewsItems: snap.val()
        });
      });
  }
  render() {
    const { goodnewsItems } = this.state;

    return (
      <StyledGoodnews>
        {isEmpty(goodnewsItems) && (
          <StyledSpin>
            <Spin indicator={antIcon} />
          </StyledSpin>
        )}
        <Tabs defaultActiveKey="201806" tabPosition="left">
          {!isEmpty(goodnewsItems) &&
            map(goodnewsItems, (value, key) => (
              <TabPane tab={key} key={key}>
                <List
                  itemLayout="horizontal"
                  dataSource={value}
                  renderItem={item => {
                    // console.log(
                    //   require(`images/cryptoIcon/${item.symbol.toLowerCase()}.svg`)
                    // );
                    return (
                      <List.Item>
                        <List.Item.Meta
                          avatar={
                            <Avatar
                            // src={require(`images/cryptoIcon/${item.symbol.toLowerCase()}.svg`)}
                            />
                          }
                          title={
                            <a href={item.url} target="_blank">
                              {item.name}
                            </a>
                          }
                          description={item.content}
                        />
                        {item.date}
                      </List.Item>
                    );
                  }}
                />
              </TabPane>
            ))}
        </Tabs>
      </StyledGoodnews>
    );
  }
}

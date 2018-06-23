import React, { Component } from 'react';
import styled from 'styled-components';
import { database } from 'config/firebase';
import { map, isEmpty } from 'lodash';
import moment from 'moment';
import 'moment/locale/ko';
import { List, Avatar, Tabs, Spin, Icon, Card, Badge } from 'antd';
const TabPane = Tabs.TabPane;

const antIcon = <Icon type="loading" style={{ fontSize: 40 }} spin />;
const StyledGoodnews = styled.div`
  position: relative;
  min-height: 70vh;
  padding: 15px 0;
  .ant-tabs-vertical.ant-tabs-left > .ant-tabs-content {
    padding-right: 24px;
  }
  .ant-tabs-bar {
    height: calc(100vh - 90px) !important;
  }
  .ant-tabs-content {
    height: calc(100vh - 90px);
    overflow-y: scroll !important;
  }
  .ant-badge {
    position: absolute;
    right: 0;
    top: 0;
  }
  .ant-badge-status-dot {
    width: 8px;
    height: 8px;
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

const StyledList = styled(List.Item)`
  height: 110px;
  overflow: hidden;
  .ant-list-item-meta {
    margin-bottom: 10px;
  }
  .ant-card-body {
    padding: 12px;

    h4 {
      font-size: 12px;
      line-height: 15px;
    }
    p {
      margin: 0;
      padding: 0;
      font-size: 11px;
      margin-bottom: 10px;
    }

    small {
      font-size: 10px;
      color: #999;
      float: right;
    }
  }
`;
export default class Goodnews extends Component {
  state = {
    goodnewsItems: {}
  };

  componentDidMount() {
    this.today = moment(new Date()).format('YYYY-MM-DD');
    this.defaultActive = `${this.today.split('-')[0]}${
      this.today.split('-')[1]
    }`;
    if (localStorage.getItem('goodnewsItems')) {
      this.setState({
        goodnewsItems: JSON.parse(localStorage.getItem('goodnewsItems'))
      });
    } else {
      database
        .ref('hozae')
        .once('value')
        .then(snap => {
          this.setState({
            goodnewsItems: snap.val()
          });

          localStorage.setItem('goodnewsItems', JSON.stringify(snap.val()));
        });
    }
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
                  grid={{
                    gutter: 16,
                    xs: 1,
                    sm: 2,
                    md: 4,
                    lg: 4,
                    xl: 6
                  }}
                  itemLayout="horizontal"
                  dataSource={value}
                  renderItem={item => {
                    let name = item.name.match(/\((.*?)\)/)[1];
                    return (
                      <StyledList>
                        <Card>
                          {this.today === item.date && (
                            <Badge status="processing" />
                          )}
                          <List.Item.Meta
                            avatar={
                              <Avatar
                                size="small"
                                src={require(`images/hozaeIcon/${name}.png`)}
                              />
                            }
                            title={
                              <a href={item.url} target="_blank">
                                {item.name}
                              </a>
                            }
                          />
                          <p>{item.content}</p>
                          <small>{item.date}</small>
                        </Card>
                      </StyledList>
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

import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { List, Avatar, Badge } from 'antd';
import moment from 'moment';
import 'moment/locale/ko';

const CryptoNews = ({ newsItems }) => (
  <Scrollbars autoHeight autoHeightMin={250}>
    <List
      itemLayout="horizontal"
      dataSource={newsItems}
      renderItem={item => (
        <List.Item>
          <List.Item.Meta
            avatar={
              <Avatar
                src={require(`images/exchangeIcon/${item.exchange_name}.svg`)}
              />
            }
            title={
              <a href={item.source_url} target="_blank">
                {item.notice_title}
              </a>
            }
            description={moment(item.created).format('YYYY-MM-DD (ddd)')}
          />
          {/* <div>{moment(item.created).format('YYYY-MM-DD (ddd)')}</div> */}
        </List.Item>
      )}
    />
  </Scrollbars>
);

export default CryptoNews;

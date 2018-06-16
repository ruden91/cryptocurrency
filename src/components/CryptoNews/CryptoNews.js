import React from 'react';
import { List, Avatar, Badge } from 'antd';
import styled from 'styled-components';
import moment from 'moment';
import 'moment/locale/ko';
const StyledList = styled(List)`
  max-height: 250px;
  overflow-y: scroll;
`;

const CryptoNews = ({ newsItems }) => (
  <StyledList
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
          // description="Ant Design, a design language for background applications, is refined by Ant UED Team"
        />
        <div>{moment(item.created).format('YYYY-MM-DD (ddd)')}</div>
      </List.Item>
    )}
  />
);

export default CryptoNews;

import React from 'react';
import styled from 'styled-components';
import { Affix, Card } from 'antd';
const StyledChatContainer = styled.div`
  background-color: #fff;
  padding: 20px;
  height: 500px;
`;
const ChatContainer = () => (
  <Affix offsetTop={0} onChange={affixed => console.log(affixed)}>
    <Card title="채팅" bordered={false} loading={true}>
      <StyledChatContainer>ChatContainer</StyledChatContainer>
    </Card>
  </Affix>
);

export default ChatContainer;

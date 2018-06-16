import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { database } from 'config/firebase';
import styled from 'styled-components';
import { Affix, Card, Input, List, Avatar } from 'antd';

import { map, size, uniqBy } from 'lodash';
const Search = Input.Search;
const StyledChatContainer = styled.div`
  background-color: #fff;
  .ant-card-body {
    padding: 0;
  }
`;

const StyledSearch = styled(Search)`
  .ant-input {
    border: none;
    border-radius: 0;
  }
  .ant-btn {
    border-radius: 0;
  }
`;
const StyledChatContent = styled.div`
  > div {
    overflow-y: scroll;
    height: 300px;

    p {
      float: left;
      width: 90%;
      padding: 0 10px;
    }
  }
`;
export default class ChatContainer extends Component {
  state = {
    messages: []
  };

  handleSearch = value => {
    const { user } = this.props;
    const ref = database.ref('messages');

    ref.push({
      uid: user.uid,
      content: value,
      name: user.displayName
    });
  };

  componentDidMount() {
    this.referenceToOldestKey = '';

    database
      .ref('messages')
      .orderByKey()
      .limitToLast(500)
      .on('value', snap => {
        const messages = map(snap.val(), (value, mid) => ({ ...value, mid }));

        this.referenceToOldestKey = messages[0].mid;
        this.setState({
          messages
        });
      });
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { messages } = this.state;

    return size(nextState.messages) !== size(messages);
  }

  componentWillUpdate(nextProps, nextState) {
    const { messages } = this.state;
    const { messageList } = this.refs;

    this.historyChanged = size(nextState.messages) !== size(messages);
    if (this.historyChanged && messageList) {
      const scrollPos = messageList.scrollTop;
      const scrollBottom = messageList.scrollHeight - messageList.clientHeight;
      this.scrollAtBottom = scrollBottom <= 0 || scrollPos === scrollBottom;
    }
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  onScroll = () => {
    // TODO: call fetchHistory when scrolled to the top
    const scrollTop = this.refs.messageList.scrollTop;

    if (scrollTop === 0) {
      database
        .ref('messages')
        .orderByKey()
        .endAt(this.referenceToOldestKey)
        .limitToLast(10)
        .once('value')
        .then(snap => {
          const { messages } = this.state;
          const newMessages = map(snap.val(), (value, mid) => ({
            ...value,
            mid
          })).slice(1, -1);

          if (newMessages.length === 0) {
            return;
          }

          this.referenceToOldestKey = newMessages[0].mid;

          this.setState({
            messages: [...newMessages, ...messages]
          });
        })
        .catch(err => console.error(err));
    }
  };

  scrollToBottom = () => {
    const { messageList } = this.refs;

    const scrollHeight = messageList.scrollHeight;
    const height = messageList.clientHeight;
    const maxScrollTop = scrollHeight - height;
    findDOMNode(messageList).scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
  };

  render() {
    const { messages } = this.state;
    const { isAuth } = this.props;

    return (
      <Affix offsetTop={0} onChange={affixed => console.log(affixed)}>
        <Card title="채팅" bordered={false} loading={!isAuth}>
          <StyledChatContainer>
            <StyledChatContent>
              <div ref="messageList" onScroll={this.onScroll}>
                <List
                  size="small"
                  dataSource={messages}
                  renderItem={item => (
                    <List.Item key={item.mid}>
                      <Avatar
                        style={{
                          backgroundColor: '#009ac8',
                          verticalAlign: 'middle'
                        }}
                      >
                        {item.name}
                      </Avatar>
                      <p>{item.content}</p>
                    </List.Item>
                  )}
                />
              </div>
            </StyledChatContent>
          </StyledChatContainer>
        </Card>
        <StyledSearch
          placeholder="메시지를 입력하세요."
          enterButton="입력"
          size="large"
          onSearch={value => this.handleSearch(value)}
        />
      </Affix>
    );
  }
}

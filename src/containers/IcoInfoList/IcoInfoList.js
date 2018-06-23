import React, { Component } from 'react';
import { List, Card, Pagination } from 'antd';
import styled from 'styled-components';

import { database } from 'config/firebase';

const StyledIcoInfoCard = styled(Card)`
  text-align: center;
  height: 275px;
  header {
    line-height: 35px;
    &:after {
      content: '';
      display: block;
      clear: both;
    }
    small {
      float: right;
    }
  }
  .title {
    margin-top: 12px;
    margin-bottom: 12px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .description {
    color: #8b95a5;
    font-weight: 300;
    display: block;
    min-height: 30px;
    max-width: 400px;
    margin: 0 auto;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  footer {
    padding-top: 24px;
    line-height: 0px;
    margin-top: 20px;
    margin-left: -24px;
    margin-right: -24px;
    margin-bottom: -24px;
    padding-left: 24px;
    padding-right: 24px;
    padding-bottom: 24px;
    background-color: #fcfdfe;
    border-top: 1px solid rgba(77, 82, 89, 0.07);
    color: #8b95a5;

    &:after {
      content: '';
      display: block;
      clear: both;
    }

    > p {
      float: left;
      margin: 0;
      color: #8b95a5;
      font-size: 12px;
      font-weight: 300;
      strong {
        font-weight: 300;
      }
    }

    > small {
      float: right;
    }
  }

  .content {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    color: #8b95a5;
    font-weight: 300;
    font-size: 11px;
  }
  .avatar {
    position: relative;
    text-align: center;
    border-radius: 100%;
    background-color: #f5f6f7;
    display: block;
    margin: 0 auto;
    width: 64px;
    height: 64px;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
  }
`;

const StyledPagination = styled(Pagination)`
  text-align: center;
  margin-top: 15px !important;
  margin-bottom: 30px !important;
`;

export default class IcoInfoList extends Component {
  state = {
    items: [],
    loading: true,
    start: 0,
    end: 12,
    total: 0
  };

  handlePagination = (a, b) => {
    this.setState({
      start: (a - 1) * 12,
      end: a * 12
    });
  };

  componentDidMount() {
    const { ico } = this.props.match.params;
    this.fetchIcoData(ico);
  }
  componentWillReceiveProps(nextProps) {
    const { ico } = this.props.match.params;
    if (ico !== nextProps.match.params.ico) {
      this.fetchIcoData(nextProps.match.params.ico);
    }
  }

  fetchIcoData = ico => {
    this.setState({
      loading: true
    });

    database
      .ref(`icoInfo/${ico}`)
      .once('value')
      .then(snap => {
        this.setState({
          items: snap.val().items,
          total: snap.val().total,
          loading: false
        });
      });
  };

  render() {
    const { loading, items, start, end, total } = this.state;
    const filteredItems = items.slice(start, end);
    return (
      <div>
        {loading && <p>loading!!!!!!!!!!!</p>}
        {!loading && (
          <div>
            <List
              grid={{ gutter: 16, xs: 1, sm: 2, md: 2, lg: 2, xl: 3 }}
              dataSource={filteredItems}
              renderItem={item => (
                <List.Item>
                  <StyledIcoInfoCard>
                    <a href={item.url} target="blank">
                      <header>
                        <small>{item.category}</small>
                      </header>
                      <div className="avatar">
                        <img src={item.img} alt={item.name} />
                      </div>
                      <p className="title">{item.name}</p>
                      <small className="description">{item.description}</small>
                      <p className="content">{item.content}</p>
                      <footer>
                        <p>
                          <strong>{item.date}</strong>
                        </p>
                        <small>{item.score}</small>
                      </footer>
                    </a>
                  </StyledIcoInfoCard>
                </List.Item>
              )}
            />
            <StyledPagination
              defaultCurrent={1}
              defaultPageSize={12}
              total={total}
              onChange={this.handlePagination}
            />
          </div>
        )}
      </div>
    );
  }
}

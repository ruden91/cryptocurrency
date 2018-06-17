import React, { Component } from 'react';
import { List, Card, Pagination } from 'antd';
import { database } from 'config/firebase';
import styled from 'styled-components';

const StyledPage = styled.div`
  padding: 25px 50px;
`;
const StyledIcoInfoCard = styled(Card)`
  text-align: center;
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
  }
`;

const StyledPagination = styled(Pagination)`
  text-align: center;
  margin-top: 15px !important;
  margin-bottom: 30px !important;
`;
export default class IcoInfo extends Component {
  state = {
    items: [],
    start: 0,
    end: 30
  };
  handlePagination = (a, b) => {
    this.setState({
      start: (a - 1) * 30,
      end: a * 30
    });
  };
  componentDidMount() {
    if (localStorage.getItem('icoItems')) {
      this.setState({
        items: JSON.parse(localStorage.getItem('icoItems')),
        total: 2898
      });
    } else {
      database
        .ref('icoInfo')
        // .orderByValue()
        // .limitToFirst(30)
        .once('value')
        .then(snap => {
          this.setState({
            items: snap.val(),
            total: 2898
          });
          localStorage.setItem('icoItems', JSON.stringify(snap.val()));
        });
    }
  }
  render() {
    const { items, total, start, end } = this.state;
    const filteredItems = items.slice(start, end);
    console.log(items.filter(item => !item));
    return (
      <StyledPage>
        <List
          grid={{ gutter: 16, xs: 1, sm: 2, md: 2, lg: 2, xl: 3 }}
          dataSource={filteredItems}
          renderItem={item => (
            <List.Item>
              <StyledIcoInfoCard>
                <header>
                  <small>{item && item.category}</small>
                </header>
                <div className="avatar">
                  <img src={item && item.img} alt={item && item.name} />
                </div>
                <p className="title">{item && item.name}</p>
                <small className="description">
                  {item && item.description}
                </small>

                <footer>
                  <p>
                    <strong>{item && item.timeString.split('↵')[0]}</strong>
                    {item && item.timeString.split('↵')[1]}
                  </p>
                  <small>{item && item.score}</small>
                </footer>
              </StyledIcoInfoCard>
            </List.Item>
          )}
        />
        <StyledPagination
          defaultCurrent={1}
          defaultPageSize={30}
          total={total}
          onChange={this.handlePagination}
        />
      </StyledPage>
    );
  }
}

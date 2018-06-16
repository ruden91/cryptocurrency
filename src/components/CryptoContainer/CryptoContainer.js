import React, { Component } from 'react';
import CryptoList from 'components/CryptoList';
import CryptoTitle from 'components/CryptoTitle';
import { Checkbox } from 'antd';
const CheckboxGroup = Checkbox.Group;

const plainOptions = ['Apple', 'Pear', 'Orange'];
const defaultCheckedList = ['Apple', 'Orange'];

export default class CryptoContainer extends Component {
  state = {
    checkedList: defaultCheckedList,
    indeterminate: true,
    checkAll: false
  };

  onChange = checkedList => {
    this.setState({
      checkedList,
      indeterminate:
        !!checkedList.length && checkedList.length < plainOptions.length,
      checkAll: checkedList.length === plainOptions.length
    });
  };
  onCheckAllChange = e => {
    this.setState({
      checkedList: e.target.checked ? plainOptions : [],
      indeterminate: false,
      checkAll: e.target.checked
    });
  };

  render() {
    const { cryptoDataSet } = this.props;
    return (
      <div>
        <Checkbox
          indeterminate={this.state.indeterminate}
          onChange={this.onCheckAllChange}
          checked={this.state.checkAll}
        >
          기준 거래소 전체
        </Checkbox>
        <br />
        <CheckboxGroup
          options={plainOptions}
          value={this.state.checkedList}
          onChange={this.onChange}
        />

        <Checkbox
          indeterminate={this.state.indeterminate}
          onChange={this.onCheckAllChange}
          checked={this.state.checkAll}
        >
          비교 거래소 전체
        </Checkbox>
        <br />
        <CheckboxGroup
          options={plainOptions}
          value={this.state.checkedList}
          onChange={this.onChange}
        />
        {cryptoDataSet.map(data => {
          return (
            <div>
              {data.standardExchange && (
                <CryptoTitle
                  title={data.standardExchange}
                  description="기준거래소"
                />
              )}
              {data.comparedExchange && (
                <CryptoTitle
                  title={data.comparedExchange}
                  description="비교거래소"
                />
              )}
              <CryptoList {...data} />
            </div>
          );
        })}
      </div>
    );
  }
}

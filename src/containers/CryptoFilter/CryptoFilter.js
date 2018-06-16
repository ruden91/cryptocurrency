import React, { Component } from 'react';
import { Checkbox } from 'antd';
import styled from 'styled-components';
const CheckboxGroup = Checkbox.Group;

const StyledCheckbox = styled.div`
  display: block;
  margin-bottom: 20px;
`;

export default class CrpytoFilter extends Component {
  state = {
    indeterminate: false,
    checkAll: true
  };

  onChange = checkedList => {
    const { onHandleCryptoFilter, initialFilters, type } = this.props;
    onHandleCryptoFilter(type, checkedList);

    this.setState({
      indeterminate:
        !!checkedList.length && checkedList.length < initialFilters.length,
      checkAll: checkedList.length === initialFilters.length
    });
  };
  onCheckAllChange = e => {
    const { onHandleCryptoFilter, initialFilters, type } = this.props;
    const list = e.target.checked ? initialFilters : [];
    onHandleCryptoFilter(type, list);

    this.setState({
      indeterminate: false,
      checkAll: e.target.checked
    });
  };

  render() {
    const { title, initialFilters, filters } = this.props;

    return (
      <StyledCheckbox>
        <Checkbox
          indeterminate={this.state.indeterminate}
          onChange={this.onCheckAllChange}
          checked={this.state.checkAll}
        >
          {title}
        </Checkbox>
        <br />
        <CheckboxGroup
          options={initialFilters}
          value={filters}
          onChange={this.onChange}
        />
      </StyledCheckbox>
    );
  }
}

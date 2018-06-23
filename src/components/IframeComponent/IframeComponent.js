import React, { Component } from 'react';
import styled from 'styled-components';
import { Spin, Icon } from 'antd';
const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
const StyledSpin = styled(Spin)`
  max-height: 450px !important;
  .ant-spin-text {
    padding-top: 15px !important;
    text-shadow: none !important;
  }
`;
export default class IframeComponent extends Component {
  state = {
    loading: true
  };

  onLoad = () => {
    this.setState({
      loading: false
    });
  };

  render() {
    const { loading } = this.state;
    const { selectedExchange, selectedAsset, selectedType } = this.props;
    return (
      <div>
        <StyledSpin tip="Loading..." spinning={loading} indicator={antIcon}>
          <iframe
            title="cryptowatch"
            src={`https://embed.cryptowat.ch/markets/${selectedExchange}/${selectedAsset}/${selectedType}`}
            frameBorder="0"
            allowFullScreen="true"
            width="100%"
            height="450"
            onLoad={() => this.onLoad()}
          />
        </StyledSpin>
      </div>
    );
  }
}

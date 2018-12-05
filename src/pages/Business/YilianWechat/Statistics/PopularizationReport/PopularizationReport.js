import React, { Component } from 'react';
import { connect } from 'dva';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';

const mapStateToProps = state => ({
  list: state.businessYilianWechatQuery.list.group,
});

const mapDispatchToProps = dispatch => ({
  onFetchPopularizationReportType1: page =>
    dispatch({
      type: 'businessYilianWechatStatistics/fetchPopularizationReportType1',
      payload: { page },
    }),
});

@connect(
  mapStateToProps,
  mapDispatchToProps
)
class PopularizationReoprt extends Component {
  componentDidMount() {
    const { onFetchPopularizationReportType1 } = this.props;
    onFetchPopularizationReportType1(0);
  }

  render() {
    return <PageHeaderWrapper>PopularizationReoprt</PageHeaderWrapper>;
  }
}

export default PopularizationReoprt;

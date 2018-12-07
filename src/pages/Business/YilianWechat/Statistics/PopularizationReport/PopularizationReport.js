import React, { Component } from 'react';
import { connect } from 'dva';
import { Select } from 'antd';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import Type1Container from './Components/Type1Container';
import Type2Container from './Components/Type2Container';
import Type3Container from './Components/Type3Container';

import { POPULARIZATION_REPORT_TYPE } from '@/models/business/yilian-wechat/statistics/statistics';

import classes from './PopularizationReport.less';

const mapStateToProps = state => ({
  reportType: state.businessYilianWechatStatistics.reportType.popularization,
});

const mapDispatchToProps = dispatch => ({
  onUpdateReportType: reportType =>
    dispatch({
      type: 'businessYilianWechatStatistics/updateReportType',
      payload: {
        pageKey: 'popularization',
        reportType,
      },
    }),
  onFetchSearchGroupList: () =>
    dispatch({
      type: 'businessYilianWechatStatistics/fetchSearchGroupList',
    }),
});

@connect(
  mapStateToProps,
  mapDispatchToProps
)
class PopularizationReoprt extends Component {
  componentDidMount() {
    const { onFetchSearchGroupList } = this.props;
    onFetchSearchGroupList();
  }

  render() {
    const { reportType, onUpdateReportType } = this.props;
    let container = '';
    if (reportType === POPULARIZATION_REPORT_TYPE.TYPE1) {
      container = <Type1Container />;
    } else if (reportType === POPULARIZATION_REPORT_TYPE.TYPE2) {
      container = <Type2Container />;
    } else if (reportType === POPULARIZATION_REPORT_TYPE.TYPE3) {
      container = <Type3Container />;
    }
    return (
      <PageHeaderWrapper>
        <div className={classes.Container}>
          <div className={classes.Search}>
            <Select
              className={classes.Gap}
              name="groupName"
              value={reportType}
              onChange={value => onUpdateReportType(value)}
              style={{ width: '100%' }}
            >
              <Select.Option value={POPULARIZATION_REPORT_TYPE.TYPE1}>
                按小组统计医院明细（微信关注量、注册量、注册转化率总量对比）
              </Select.Option>
              <Select.Option value={POPULARIZATION_REPORT_TYPE.TYPE2}>
                按小组（微信关注量、注册量、注册转化率）总量统计
              </Select.Option>
              <Select.Option value={POPULARIZATION_REPORT_TYPE.TYPE3}>
                按所有医院（微信关注量、注册量、注册转化率）总量统计
              </Select.Option>
              <Select.Option value={POPULARIZATION_REPORT_TYPE.TYPE4}>
                微信关注量、注册量、注册转化率日数据（根据小组统计）
              </Select.Option>
            </Select>
          </div>
          {container}
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default PopularizationReoprt;

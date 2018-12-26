import React, { Component } from 'react';
import { connect } from 'dva';
import { Select } from 'antd';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import AppointmentType1Container from './Components/AppointmentType1Container';

import { APPOINTMENTS_REPORT_TYPE } from '@/models/business/yilian-wechat/statistics/statisticsdata';

import classes from './AppointmentsReport.less';

const mapStateToProps = state => ({
  reportType: state.businessYilianWechatStatisticsAppointment.reportType.appointments,
});

const mapDispatchToProps = dispatch => ({
  onUpdateReportType: reportType =>
    dispatch({
      type: 'businessYilianWechatStatisticsAppointment/updateReportType',
      payload: {
        pageKey: 'appointments',
        reportType,
      },
    }),
  onFetchSearchGroupList: () =>
    dispatch({
      type: 'businessYilianWechatStatisticsAppointment/fetchSearchGroupList',
    }),
});

@connect(
  mapStateToProps,
  mapDispatchToProps
)
class AppointmentsReport extends Component {
  componentDidMount() {
    const { onFetchSearchGroupList } = this.props;
    onFetchSearchGroupList();
  }

  render() {
    const { reportType, onUpdateReportType } = this.props;
    let container = '';
    if (reportType === APPOINTMENTS_REPORT_TYPE.TYPE1) {
      container = <AppointmentType1Container />;
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
              open={false}
            >
              <Select.Option value={APPOINTMENTS_REPORT_TYPE.TYPE1}>
                {/* 按小组统计医院明细（微信关注量、注册量、注册转化率总量对比） */}
                按小组显示各医院预约量对比
              </Select.Option>
            </Select>
          </div>
          {/* <div className={classes.OnlySearch}>按小组显示各医院预约量对比</div> */}
          {container}
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default AppointmentsReport;

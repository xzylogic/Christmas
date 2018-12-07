import React, { Component } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import debounce from 'lodash.debounce';

import AppointmentsBar from './AppointmentsBar';
import TableList from '@/components/PageComponents/Table/TableList';

const mapStateToProps = state => ({
  groupList: state.businessYilianWechatQuery.list.appointment,
  currentPage: state.businessYilianWechatQuery.currentPage.appointment,
  totalElements: state.businessYilianWechatQuery.totalElements.appointment,
  searchParam: state.businessYilianWechatQuery.searchParam.appointment,
  loading: state.loading.effects['businessYilianWechatQuery/fetchAppointmentPerformance'],
});

const mapDispatchToProps = dispatch => ({
  onFetchAppointmentList: page =>
    dispatch({
      type: 'businessYilianWechatQuery/fetchAppointmentPerformance',
      payload: { page },
    }),
  onFetchAppointmentListDebounce: debounce(
    page =>
      dispatch({
        type: 'businessYilianWechatQuery/fetchAppointmentPerformance',
        payload: { page },
      }),
    500
  ),
  onSearchParamChange: (key, value) =>
    dispatch({
      type: 'businessYilianWechatQuery/updateSearchParam',
      payload: { origin: 'appointment', key, value },
    }),
  // onFetchGroupMonth: value =>
  //   dispatch({
  //     type: 'businessYilianWechatQuery/fetchGroupMonth',
  //     payload: { value },
  //   }),
  // onGetQueryMessage: value =>
  //   dispatch({
  //     type: 'businessYilianWechatQuery/getQueryMessage',
  //     payload: { value },
  //   }),
});

@connect(
  mapStateToProps,
  mapDispatchToProps
)
class AppointmentsContainer extends Component {
  state = {
    // showDetail: false,
    // selectedName: '',
    amountSetShow: true,
    // visible: false,
  };

  componentDidMount() {
    const { onFetchAppointmentList } = this.props;
    onFetchAppointmentList(0);
  }

  handleParamsChanged = async (value, dataKey) => {
    const { onSearchParamChange, onFetchAppointmentListDebounce } = this.props;
    if (dataKey === 'date') {
      await onSearchParamChange('startTime', value[0]);
      await onSearchParamChange('endTime', value[1]);
    } else {
      await onSearchParamChange(dataKey, value);
    }
    await onFetchAppointmentListDebounce(0);
  };

  handleDetail = (e, record) => {
    e.preventDefault();
    console.log(record);
    // this.setState({
    //   showDetail: true,
    //   selectedName: record.name,
    // });
    // const { onFetchGroupMonth } = this.props;
    // onFetchGroupMonth(record.name);
  };

  setTableColumns = () => {
    const columns = [
      {
        title: '预约日期',
        dataIndex: 'schedule_date',
        key: 'schedule_date',
      },
      // {
      //   title: '就诊日期',
      //   dataIndex: 'schedule_date',
      //   key: 'schedule_date',
      //   render: () => '-',
      // },
      {
        title: '预约时段',
        dataIndex: 'order_time',
        key: 'order_time',
      },
      {
        title: '预约科室',
        dataIndex: 'dept_name',
        key: 'dept_name',
      },
      {
        title: '预约医院',
        dataIndex: 'hos_org_name',
        key: 'hos_org_name',
      },
      {
        title: '预约医生',
        dataIndex: 'doct_name',
        key: 'doct_name',
      },
      {
        title: '预约来源',
        dataIndex: 'order_channel',
        key: 'order_channel',
      },
      {
        title: '患者姓名',
        dataIndex: 'patient_name',
        key: 'patient_name',
      },
      // {
      //   title: '性别',
      //   dataIndex: 'patient_name',
      //   key: 'patient_name',
      //   render: () => '-',
      // },
      {
        title: '患者卡号',
        dataIndex: 'medi_card_id',
        key: 'medi_card_id',
      },
      {
        title: '卡类型',
        dataIndex: 'medi_card_id_type',
        key: 'medi_card_id_type',
      },
      // {
      //   title: '手机',
      //   dataIndex: 'medi_card_id',
      //   key: 'medi_card_id',
      //   render: () => '-',
      // },
      {
        title: '身份证号',
        dataIndex: 'patient_card_id',
        key: 'patient_card_id',
      },
      {
        title: '订单号',
        dataIndex: 'order_id',
        key: 'order_id',
      },
      // {
      //   title: '预约编号',
      //   dataIndex: 'order_id',
      //   key: 'order_id',
      //   render: () => '-',
      // },
      {
        title: '预约状态',
        dataIndex: 'order_status',
        key: 'order_status',
      },
      // {
      //   title: '取消原因',
      //   dataIndex: 'order_status',
      //   key: 'order_status',
      //   render: () => '-',
      // },
      {
        title: '操作',
        dataIndex: 'id',
        key: 'action',
        render: (_, record) => (
          <span>
            <a onClick={e => this.handleDetail(e, record)}>查看详情</a>
          </span>
        ),
      },
    ];
    return columns;
  };

  handlePageChange = page => {
    const { onFetchAppointmentList } = this.props;
    onFetchAppointmentList(page - 1);
  };

  // handleAmountSet = e => {
  //   e.preventDefault();
  //   this.setState({ visible: true });
  //   // console.log('amountset');
  // };

  handleReset = async e => {
    e.preventDefault();
    const { onSearchParamChange, onFetchAppointmentList } = this.props;
    await onSearchParamChange(
      'startTime',
      moment(new Date().valueOf() - 604800000).format('YYYY-MM-DD')
    );
    await onSearchParamChange('endTime', moment(new Date().valueOf()).format('YYYY-MM-DD'));
    await onSearchParamChange('name', '');
    await onFetchAppointmentList(0);
  };

  handleExport = e => {
    e.preventDefault();
    console.log('export');
  };

  // handleDetailClose = e => {
  //   e.preventDefault();
  //   this.setState({
  //     showDetail: false,
  //   });
  // };

  render() {
    const { searchParam, groupList, currentPage, totalElements } = this.props;
    const { amountSetShow } = this.state;
    return (
      <React.Fragment>
        <AppointmentsBar
          params={searchParam}
          onAmountSet={this.handleAmountSet}
          onReset={this.handleReset}
          onExport={this.handleExport}
          onParamsChange={this.handleParamsChanged}
          inputPlaceholder="请输入项目"
          amountSetShow={amountSetShow}
        />
        <TableList
          rowKey="update_time"
          list={groupList}
          columns={this.setTableColumns()}
          currentPage={currentPage}
          totalElements={totalElements}
          onPageChange={this.handlePageChange}
        />
      </React.Fragment>
    );
  }
}

export default AppointmentsContainer;

import React from 'react';
import { Select, Button, DatePicker, Row, Col } from 'antd';
// import moment from 'moment';

import classes from './PopularizationBar.less';

function PopularizationBar(props) {
  const { onExport } = props;
  // console.log(this.props);
  return (
    <Row className={classes.Container}>
      <Col span={24} className={classes.Container}>
        <Select
          name="way"
          // value={way}
          className={classes.Gap}
          style={{ width: 115 }}
          // name='type'
          // value={params.type}
          // onChange={value => onParamsChange(value, 'type')}
          placeholder="统计方式"
          // onChange={onChangeWay}
        >
          <Select.Option value="0">按日统计</Select.Option>
          <Select.Option value="1">按周统计</Select.Option>
          <Select.Option value="2">按月统计</Select.Option>
          <Select.Option value="3">按年统计</Select.Option>
        </Select>
        <span>
          <DatePicker.RangePicker
            className={classes.Gap}
            // value={[moment(params.time, 'YYYY-MM-DD'), moment(params.endTime, 'YYYY-MM-DD')]}
            // onChange={(_, dateStrings) => onParamsChange(dateStrings, 'date')}
            // allowClear={false}
            // ranges={{
            //   最近一周: [
            //     moment(new Date(new Date().valueOf() - 604800000), 'YYYY-MM-DD'),
            //     moment(new Date(), 'YYYY-MM-DD'),
            //   ],
            //   最近30天: [
            //     moment(new Date(new Date().valueOf() - 2592000000), 'YYYY-MM-DD'),
            //     moment(new Date(), 'YYYY-MM-DD'),
            //   ],
            //   最近一年: [
            //     moment(new Date(new Date().valueOf() - 31536000000), 'YYYY-MM-DD'),
            //     moment(new Date(), 'YYYY-MM-DD'),
            //   ],
            // }}
          />
        </span>
        <span className={classes.Span}>
          数据来源：
          <Select
            style={{ width: 115 }}
            className={classes.Gap}
            placeholder="数据来源"
            // defaultValue='0'
            // onChange={value => onParamsChange(value, 'orderStatus')}
          >
            <Select.Option value="0">医联微信</Select.Option>
            <Select.Option value="1">医联APP</Select.Option>
          </Select>
        </span>
      </Col>
      {/* <Col span={15}> */}
      {/* </Col> */}
      {/* <Col span={8} className={classes.ColRight}> */}
      <span className={classes.Span}>
        医院等级：
        <Select
          style={{ width: 115 }}
          className={classes.Gap}
          placeholder="医院等级"
          // defaultValue='0'
          // onChange={value => onParamsChange(value, 'orderStatus')}
        >
          <Select.Option value="0">一级（社区卫生服务中心）</Select.Option>
          <Select.Option value="1">二级乙等</Select.Option>
          <Select.Option value="2">二级甲等</Select.Option>
          <Select.Option value="3">三级乙等</Select.Option>
          <Select.Option value="4">三级甲等</Select.Option>
        </Select>
      </span>
      <span className={classes.Span}>
        医院名称：
        <Select
          style={{ width: 115 }}
          className={classes.Gap}
          placeholder="医院名称"
          defaultValue="0"
          // onChange={value => onParamsChange(value, 'orderStatus')}
        >
          <Select.Option value="0">全部医院</Select.Option>
          <Select.Option value="1">医院1</Select.Option>
          <Select.Option value="2">医院2</Select.Option>
          <Select.Option value="3">医院3</Select.Option>
        </Select>
      </span>
      <span className={classes.Span}>
        渠道：
        <Select
          style={{ width: 115 }}
          className={classes.Gap}
          placeholder="渠道"
          // defaultValue='0'
          // onChange={value => onParamsChange(value, 'orderStatus')}
        >
          <Select.Option value="0">医联微信</Select.Option>
          <Select.Option value="1">医联APP</Select.Option>
        </Select>
      </span>
      <span className={classes.Span}>
        组别：
        <Select
          style={{ width: 115 }}
          className={classes.Gap}
          placeholder="组别"
          // defaultValue='0'
          // onChange={value => onParamsChange(value, 'orderStatus')}
        >
          <Select.Option value="0">医联微信</Select.Option>
          <Select.Option value="1">医联APP</Select.Option>
        </Select>
      </span>
      <span className={classes.BtnRight}>
        {/* <Button type='primary' htmlType='button' onClick={onReset} className={classes.Gap}>
            查询
          </Button> */}
        <Button type="primary" htmlType="button" className={classes.Gap}>
          重置
        </Button>
        <Button type="primary" htmlType="button" onClick={onExport}>
          导出Excel
        </Button>
        {/* <Button type="primary" htmlType="button" onClick={onReset} className={classes.Gap}>
          重置
        </Button>
        <Button type="primary" htmlType="button" onClick={onExport}>
          导出Excel
        </Button> */}
      </span>
      {/* </Col> */}
    </Row>
  );
}

// class PopularizationBar extends Component {
//   render() {
//     // const { onReset, onExport, params, onParamsChange } = props;
//     const { onExport } = this.props;
//     console.log(this.props);
//     return (
//       <Row className={classes.Container}>
//         <Col span={24} className={classes.Container}>
//           <Select
//             name="way"
//             // value={way}
//             className={classes.Gap}
//             style={{ width: 115 }}
//             // name='type'
//             // value={params.type}
//             // onChange={value => onParamsChange(value, 'type')}
//             placeholder="统计方式"
//             // onChange={onChangeWay}
//           >
//             <Select.Option value="0">按日统计</Select.Option>
//             <Select.Option value="1">按周统计</Select.Option>
//             <Select.Option value="2">按月统计</Select.Option>
//             <Select.Option value="3">按年统计</Select.Option>
//           </Select>
//           <span>
//             <DatePicker.RangePicker
//               className={classes.Gap}
//               // value={[moment(params.time, 'YYYY-MM-DD'), moment(params.endTime, 'YYYY-MM-DD')]}
//               // onChange={(_, dateStrings) => onParamsChange(dateStrings, 'date')}
//               // allowClear={false}
//               // ranges={{
//               //   最近一周: [
//               //     moment(new Date(new Date().valueOf() - 604800000), 'YYYY-MM-DD'),
//               //     moment(new Date(), 'YYYY-MM-DD'),
//               //   ],
//               //   最近30天: [
//               //     moment(new Date(new Date().valueOf() - 2592000000), 'YYYY-MM-DD'),
//               //     moment(new Date(), 'YYYY-MM-DD'),
//               //   ],
//               //   最近一年: [
//               //     moment(new Date(new Date().valueOf() - 31536000000), 'YYYY-MM-DD'),
//               //     moment(new Date(), 'YYYY-MM-DD'),
//               //   ],
//               // }}
//             />
//           </span>
//           <span className={classes.Span}>
//             数据来源：
//             <Select
//               style={{ width: 115 }}
//               className={classes.Gap}
//               placeholder="数据来源"
//               // defaultValue='0'
//               onChange={value => onParamsChange(value, 'orderStatus')}
//             >
//               <Select.Option value="0">医联微信</Select.Option>
//               <Select.Option value="1">医联APP</Select.Option>
//             </Select>
//           </span>
//         </Col>
//         {/* <Col span={15}> */}
//         {/* </Col> */}
//         {/* <Col span={8} className={classes.ColRight}> */}
//         <span className={classes.Span}>
//           医院等级：
//           <Select
//             style={{ width: 115 }}
//             className={classes.Gap}
//             placeholder="医院等级"
//             // defaultValue='0'
//             // onChange={value => onParamsChange(value, 'orderStatus')}
//           >
//             <Select.Option value="0">一级（社区卫生服务中心）</Select.Option>
//             <Select.Option value="1">二级乙等</Select.Option>
//             <Select.Option value="2">二级甲等</Select.Option>
//             <Select.Option value="3">三级乙等</Select.Option>
//             <Select.Option value="4">三级甲等</Select.Option>
//           </Select>
//         </span>
//         <span className={classes.Span}>
//           医院名称：
//           <Select
//             style={{ width: 115 }}
//             className={classes.Gap}
//             placeholder="医院名称"
//             defaultValue="0"
//             // onChange={value => onParamsChange(value, 'orderStatus')}
//           >
//             <Select.Option value="0">全部医院</Select.Option>
//             <Select.Option value="1">医院1</Select.Option>
//             <Select.Option value="2">医院2</Select.Option>
//             <Select.Option value="3">医院3</Select.Option>
//           </Select>
//         </span>
//         <span className={classes.Span}>
//           渠道：
//           <Select
//             style={{ width: 115 }}
//             className={classes.Gap}
//             placeholder="渠道"
//             // defaultValue='0'
//             onChange={value => onParamsChange(value, 'orderStatus')}
//           >
//             <Select.Option value="0">医联微信</Select.Option>
//             <Select.Option value="1">医联APP</Select.Option>
//           </Select>
//         </span>
//         <span className={classes.Span}>
//           组别：
//           <Select
//             style={{ width: 115 }}
//             className={classes.Gap}
//             placeholder="组别"
//             // defaultValue='0'
//             onChange={value => onParamsChange(value, 'orderStatus')}
//           >
//             <Select.Option value="0">医联微信</Select.Option>
//             <Select.Option value="1">医联APP</Select.Option>
//           </Select>
//         </span>
//         <span className={classes.BtnRight}>
//           {/* <Button type='primary' htmlType='button' onClick={onReset} className={classes.Gap}>
//             查询
//           </Button> */}
//           <Button type="primary" htmlType="button" className={classes.Gap}>
//             重置
//           </Button>
//           <Button type="primary" htmlType="button" onClick={onExport}>
//             导出Excel
//           </Button>
//           {/* <Button type="primary" htmlType="button" onClick={onReset} className={classes.Gap}>
//           重置
//         </Button>
//         <Button type="primary" htmlType="button" onClick={onExport}>
//           导出Excel
//         </Button> */}
//         </span>
//         {/* </Col> */}
//       </Row>
//     );
//   }
// }

export default PopularizationBar;

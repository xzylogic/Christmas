import React, { Component } from 'react';
import { connect } from 'dva';
import { Form, Modal, Input, Select, Checkbox, DatePicker } from 'antd';
import moment from 'moment';

const mapStateToProps = state => ({
  createLoading: state.loading.effects['businessYilianWechatManagement/createMember'],
  modifyLoading: state.loading.effects['businessYilianWechatManagement/createMember'],
  getMessage: state.businessYilianWechatManagement.list.person,
  groupHosNameList: state.businessYilianWechatManagement.list.groupHosName,
  groupHosNameEditorList: state.businessYilianWechatManagement.list.groupHosNameEditor,
});

const mapDispatchToProps = dispatch => ({
  onCreateMember: postData =>
    dispatch({
      type: 'businessYilianWechatManagement/createMember',
      payload: { postData },
    }),
  onModifyMember: postData =>
    dispatch({
      type: 'businessYilianWechatManagement/modifyMember',
      payload: { postData },
    }),
});

const getSecondsDisabled = num => {
  const secDisableArr = [];
  for (let sec = 1; sec < num; sec += 1) {
    secDisableArr.push(sec);
  }
  return secDisableArr;
};

@connect(
  mapStateToProps,
  mapDispatchToProps
)
@Form.create()
class MemberEditor extends Component {
  state = {
    haveDefaultSite: true,
  };

  handleSubmit = e => {
    e.preventDefault();
    const { form, onCreateMember, onModifyMember, onClose, initialValue } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (!err && !initialValue) {
        const postData = {
          name: values.name,
          sex: values.sex,
          phone: values.phone,
          jobNumber: values.jobNumber,
          groupId: values.groupName,
          site: values.site,
          promoCode: values.promoCode.join(' '),
          effectiveDate: values.effectiveDate.format('YYYY-MM-DD HH:mm'),
        };
        onCreateMember(postData).then(ifsuccess => {
          if (ifsuccess) {
            onClose();
          }
        });
      } else if (!err && initialValue) {
        const postData = {
          id: initialValue.id,
          name: values.name,
          sex: values.sex,
          phone: values.phone,
          jobNumber: values.jobNumber,
          groupId: values.groupName,
          site: values.site,
          promoCode: values.promoCode.join(' '),
          effectiveDate: values.effectiveDate.format('YYYY-MM-DD HH:mm'),
        };
        onModifyMember(postData).then(ifsuccess => {
          if (ifsuccess) {
            onClose();
          }
        });
      }
    });
    this.setState({ haveDefaultSite: true });
  };

  handleChangeGroupAdd = value => {
    const { onParamChange, form } = this.props;
    onParamChange('hosGroupName', value);
    form.resetFields('site', '');
  };

  handleChangeGroupEditor = value => {
    this.setState({ haveDefaultSite: false });
    const { onParamChange, form } = this.props;
    onParamChange('recordGroupName', value);
    form.resetFields('site', '');
  };

  handleCancle = () => {
    const { onClose } = this.props;
    this.setState({ haveDefaultSite: true });
    onClose();
  };

  render() {
    const {
      visible,
      showAdd,
      initialValue,
      createLoading,
      modifyLoading,
      getMessage,
      groupHosNameList,
      groupHosNameEditorList,
      form: { getFieldDecorator },
    } = this.props;
    const { haveDefaultSite } = this.state;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 18 },
      },
    };

    const options = [
      { label: '医联微信', value: '医联微信' },
      { label: '支付宝', value: '支付宝' },
      { label: 'APP', value: 'APP' },
      { label: '健康云', value: '健康云' },
    ];
    const secDisableArr = getSecondsDisabled(60);

    function disabledDateTime() {
      return {
        disabledSeconds: () => secDisableArr,
      };
    }

    const EditorSite = () => {
      let content = '';
      if (groupHosNameEditorList instanceof Object && groupHosNameEditorList.length) {
        if (haveDefaultSite) {
          content = (
            <Form.Item {...formItemLayout} label="推广地址">
              {getFieldDecorator('site', {
                initialValue:
                  (initialValue && initialValue.site) || groupHosNameEditorList[0].hos_name,
                rules: [{ required: true, message: '请选择推广地址！' }],
              })(
                <Select
                  placeholder="请选择推广地址"
                  getPopupContainer={triggerNode => triggerNode.parentNode}
                >
                  {groupHosNameEditorList.map(item => (
                    <Select.Option id={item.id} key={item.id} value={item.hos_name}>
                      {item.hos_name}
                    </Select.Option>
                  ))}
                </Select>
              )}
            </Form.Item>
          );
        } else {
          content = (
            <Form.Item {...formItemLayout} label="推广地址">
              {getFieldDecorator('site', {
                initialValue:
                  groupHosNameEditorList[0].hos_name || (initialValue && initialValue.site),
                rules: [{ required: true, message: '请选择推广地址！' }],
              })(
                <Select
                  placeholder="请选择推广地址"
                  getPopupContainer={triggerNode => triggerNode.parentNode}
                >
                  {groupHosNameEditorList.map(item => (
                    <Select.Option id={item.id} key={item.id} value={item.hos_name}>
                      {item.hos_name}
                    </Select.Option>
                  ))}
                </Select>
              )}
            </Form.Item>
          );
        }
      }
      return content;
    };

    return (
      <Modal
        title={showAdd ? '新增' : '编辑'}
        centered
        visible={visible}
        onOk={this.handleSubmit}
        okButtonProps={{ htmlType: 'submit' }}
        confirmLoading={createLoading || modifyLoading}
        // onCancel={onClose}
        onCancel={this.handleCancle}
      >
        {visible ? (
          <Form>
            {showAdd ? (
              <div>
                <Form.Item {...formItemLayout} label="姓名">
                  {getFieldDecorator('name', {
                    rules: [{ required: true, message: '请填写姓名！' }],
                  })(<Input placeholder="请填写姓名" />)}
                </Form.Item>
                <Form.Item {...formItemLayout} label="性别">
                  {getFieldDecorator('sex', {
                    rules: [{ required: true, message: '请选择性别！' }],
                  })(
                    <Select>
                      <Select.Option value="男">男</Select.Option>
                      <Select.Option value="女">女</Select.Option>
                    </Select>
                  )}
                </Form.Item>
                <Form.Item {...formItemLayout} label="手机">
                  {getFieldDecorator('phone', {
                    rules: [{ message: '请填写手机号！' }],
                  })(<Input placeholder="请填写手机号" />)}
                </Form.Item>
                <Form.Item {...formItemLayout} label="工号">
                  {getFieldDecorator('jobNumber', {
                    rules: [{ required: true, message: '请填写工号！' }],
                  })(<Input placeholder="请填写工号" />)}
                </Form.Item>

                <Form.Item {...formItemLayout} label="生效时间">
                  {getFieldDecorator('effectiveDate', {
                    rules: [{ required: true, message: '请选择生效时间！' }],
                  })(
                    <DatePicker
                      format="YYYY-MM-DD HH:mm"
                      disabledTime={disabledDateTime}
                      showToday={false}
                      showTime={{ defaultValue: moment('09:00', 'HH:mm') }}
                      setFieldsValue={moment(new Date(), 'YYYY-MM-DD')}
                    />
                  )}
                </Form.Item>
                <Form.Item {...formItemLayout} label="所属小组">
                  {getFieldDecorator('groupName', {
                    rules: [{ required: true, message: '请选择小组！' }],
                    resetFields: {},
                  })(
                    <Select
                      onChange={this.handleChangeGroupAdd}
                      getPopupContainer={triggerNode => triggerNode.parentNode}
                    >
                      {getMessage.groups.map(item => (
                        <Select.Option id={item.id} key={item.id} value={item.id}>
                          {item.name}
                        </Select.Option>
                      ))}
                    </Select>
                  )}
                </Form.Item>
                {groupHosNameList instanceof Object && groupHosNameList.length ? (
                  <Form.Item {...formItemLayout} label="推广地址">
                    {getFieldDecorator('site', {
                      rules: [{ required: true, message: '请选择推广地址！' }],
                    })(
                      <Select
                        placeholder="请选择推广地址"
                        getPopupContainer={triggerNode => triggerNode.parentNode}
                      >
                        {groupHosNameList.map(item => (
                          <Select.Option id={item.id} key={item.id} value={item.hos_name}>
                            {item.hos_name}
                          </Select.Option>
                        ))}
                      </Select>
                    )}
                  </Form.Item>
                ) : (
                  ''
                )}
                <Form.Item {...formItemLayout} label="推广码">
                  {getFieldDecorator('promoCode', {
                    rules: [{ required: true, message: '请选择推广码！' }],
                  })(<Checkbox.Group options={options} />)}
                </Form.Item>
              </div>
            ) : (
              // 编辑人员
              <div>
                <Form.Item {...formItemLayout} label="手机">
                  {getFieldDecorator('phone', {
                    initialValue: (initialValue && initialValue.phone) || '',
                    rules: [{ message: '请填写手机号！' }],
                  })(<Input placeholder="请填写手机号" />)}
                </Form.Item>
                <Form.Item {...formItemLayout} label="生效时间">
                  {getFieldDecorator('effectiveDate', {
                    rules: [{ required: true, message: '请选择生效时间！' }],
                  })(
                    <DatePicker
                      format="YYYY-MM-DD HH:mm"
                      showToday={false}
                      disabledTime={disabledDateTime}
                      showTime={{ defaultValue: moment('09:00', 'HH:mm') }}
                      setFieldsValue={moment(new Date(), 'YYYY-MM-DD')}
                    />
                  )}
                </Form.Item>
                <Form.Item {...formItemLayout} label="所属小组">
                  {getFieldDecorator('groupName', {
                    initialValue: (initialValue && initialValue.groupName) || '',
                    rules: [{ required: true, message: '请选择小组！' }],
                  })(
                    <Select
                      onChange={this.handleChangeGroupEditor}
                      getPopupContainer={triggerNode => triggerNode.parentNode}
                    >
                      {getMessage.groups.map(item => (
                        <Select.Option id={item.id} key={item.id} value={item.id}>
                          {item.name}
                        </Select.Option>
                      ))}
                    </Select>
                  )}
                </Form.Item>
                {EditorSite()}
                <Form.Item {...formItemLayout} label="推广码">
                  {getFieldDecorator('promoCode', {
                    initialValue: initialValue && initialValue.promoCode.split(' '),
                    rules: [{ required: true, message: '请选择推广码！' }],
                  })(<Checkbox.Group options={options} />)}
                </Form.Item>
              </div>
            )}
          </Form>
        ) : (
          ''
        )}
      </Modal>
    );
  }
}

export default MemberEditor;

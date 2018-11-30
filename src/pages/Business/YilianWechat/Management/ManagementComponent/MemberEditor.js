import React, { Component } from 'react';
import { connect } from 'dva';
import { Form, Modal, Input, Select, Cascader } from 'antd';

const mapStateToProps = state => ({
  createLoading: state.loading.effects['businessYilianWechatManagement/createMember'],
  modifyLoading: state.loading.effects['businessYilianWechatManagement/createMember'],
  getMessage: state.businessYilianWechatManagement.list.person,
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

@connect(
  mapStateToProps,
  mapDispatchToProps
)
@Form.create()
class MemberEditor extends Component {
  handleSubmit = e => {
    e.preventDefault();
    const { form, onCreateMember, onModifyMember, onClose, initialValue } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      console.log(values);
      if (!err && !initialValue) {
        const postData = {
          name: values.name,
          sex: values.sex,
          phone: values.phone,
          jobNumber: values.jobNumber,
          groupName: values.groupName,
          site: values.site,
          promoCode: values.promoCode,
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
          groupName: values.groupName,
          site: values.site,
          promoCode: values.promoCode,
        };
        onModifyMember(postData).then(ifsuccess => {
          if (ifsuccess) {
            onClose();
          }
        });
      }
    });
  };

  // handleChange = (e, promoCodeArr) => {
  //   if (e.target.checked) {
  //     promoCodeArr.push(e.target.value);
  //   } else {
  //     for (let i = 0; i < promoCodeArr.length; i++) {
  //       if (promoCodeArr.indexOf(e.target.value) !== -1) {
  //         promoCodeArr.splice(promoCodeArr.indexOf(e.target.value), 1);
  //       }
  //     }
  //   }
  //   promoCodeArr = promoCodeArr.join(' ');
  //   console.log(promoCodeArr);
  //   // const {setFieldsValue,getFieldDecorator} = this.props.form;
  //   // setFieldsValue({
  //   //   promoCode: promoCodeArr,
  //   // })
  //   // console.log(getFieldDecorator('promoCode'))
  //   // return promoCodeArr;
  // };

  handleMessage = getMessage => {
    console.log(getMessage.groups);
    console.log(getMessage.sites);
  };

  render() {
    const {
      visible,
      showAdd,
      initialValue,
      createLoading,
      modifyLoading,
      onClose,
      // promoCodeArr,
      getMessage,
      form: { getFieldDecorator },
    } = this.props;

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

    const residences = [
      {
        value: '1',
        label: '1',
      },
      {
        value: '2',
        label: '2',
      },
    ];
    // const residences = [getMessage.groups]

    return (
      <Modal
        title={showAdd ? '新增' : '编辑'}
        centered
        visible={visible}
        onOk={this.handleSubmit}
        okButtonProps={{ htmlType: 'submit' }}
        confirmLoading={createLoading || modifyLoading}
        onCancel={onClose}
      >
        {visible ? (
          <Form>
            {showAdd ? (
              <div>
                <Form.Item {...formItemLayout} label="姓名">
                  {getFieldDecorator('name', {
                    initialValue: (initialValue && initialValue.name) || '',
                    rules: [{ required: true, message: '请填写姓名' }],
                  })(
                    <Input
                      placeholder="请填写姓名"
                      onChange={() => {
                        this.handleMessage(getMessage);
                      }}
                    />
                  )}
                </Form.Item>
                <Form.Item {...formItemLayout} label="性别">
                  {getFieldDecorator('sex', {
                    initialValue: (initialValue && `${initialValue.sex}`) || 'true',
                    rules: [{ required: true, message: '请选择性别' }],
                  })(
                    <Select>
                      <Select.Option value="true">男</Select.Option>
                      <Select.Option value="false">女</Select.Option>
                    </Select>
                  )}
                </Form.Item>
              </div>
            ) : (
              ''
            )}
            <Form.Item {...formItemLayout} label="手机">
              {getFieldDecorator('phone', {
                initialValue: (initialValue && initialValue.phone) || '',
                rules: [{ message: '请填写手机号' }],
              })(<Input placeholder="请填写手机号" />)}
            </Form.Item>
            {showAdd ? (
              <Form.Item {...formItemLayout} label="工号">
                {getFieldDecorator('jobNumber', {
                  initialValue: (initialValue && initialValue.jobNumber) || '',
                  rules: [{ required: true, message: '请填写工号' }],
                })(<Input placeholder="请填写工号" />)}
              </Form.Item>
            ) : (
              ''
            )}
            <Form.Item {...formItemLayout} label="所属小组">
              {getFieldDecorator('groupName', {
                initialValue: (initialValue && initialValue.groupName) || '',
                rules: [{ required: true, message: '请选择小组' }],
              })(<Cascader options={residences} />)}
            </Form.Item>
            <Form.Item {...formItemLayout} label="推广地址">
              {getFieldDecorator('site', {
                initialValue: (initialValue && initialValue.site) || '',
                rules: [{ required: true, message: '请选择推广地址' }],
              })(
                <Select>
                  <Select.Option value="11">推广地址11</Select.Option>
                </Select>
              )}
            </Form.Item>
            <Form.Item {...formItemLayout} label="推广码">
              {getFieldDecorator('promoCode', {
                initialValue: (initialValue && `${initialValue.promoCode}`) || '微信',
                rules: [{ required: true, message: '请选择推广码' }],
              })(
                <div>
                  {/* <Checkbox value="医联微信" onChange={e => this.handleChange(e, promoCodeArr)}>
                    医联微信
                  </Checkbox>
                  <Checkbox value="支付宝" onChange={e => this.handleChange(e, promoCodeArr)}>
                    支付宝
                  </Checkbox>
                  <Checkbox value="APP" onChange={e => this.handleChange(e, promoCodeArr)}>
                    APP
                  </Checkbox>
                  <Checkbox value="健康云" onChange={e => this.handleChange(e, promoCodeArr)}>
                    健康云
                  </Checkbox> */}
                </div>
              )}
            </Form.Item>
            {/* <Form.Item
              {...formItemLayout} label="推广码">
              <Checkbox {...getFieldProps('eat', {
                valuePropName: 'checked',
              })} />医联微信 &nbsp;
              <Checkbox {...getFieldProps('alypay', {
                valuePropName: 'checked',
              })} />支付宝 &nbsp;
              <Checkbox {...getFieldProps('alypay', {
                valuePropName: 'checked',
              })} />APP &nbsp;
            </Form.Item> */}
          </Form>
        ) : (
          ''
        )}
      </Modal>
    );
  }
}

export default MemberEditor;

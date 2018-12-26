import React, { Component } from 'react';
import { connect } from 'dva';
import { Form, Modal, Input, Select, Checkbox } from 'antd';

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
      if (!err && !initialValue) {
        const postData = {
          name: values.name,
          sex: values.sex,
          phone: values.phone,
          jobNumber: values.jobNumber,
          groupId: values.groupName,
          site: values.site,
          promoCode: values.promoCode.join(' '),
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
          promoCode: values.promoCode.join(' '),
        };
        onModifyMember(postData).then(ifsuccess => {
          if (ifsuccess) {
            onClose();
          }
        });
      }
    });
  };

  render() {
    const {
      visible,
      showAdd,
      initialValue,
      createLoading,
      modifyLoading,
      onClose,
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
    const options = [
      { label: '医联微信', value: '医联微信' },
      { label: '支付宝', value: '支付宝' },
      { label: 'APP', value: 'APP' },
      { label: '健康云', value: '健康云' },
    ];
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
                    rules: [{ required: true, message: '请填写姓名！' }],
                  })(<Input placeholder="请填写姓名" />)}
                </Form.Item>
                <Form.Item {...formItemLayout} label="性别">
                  {getFieldDecorator('sex', {
                    initialValue: (initialValue && `${initialValue.sex}`) || '男',
                    rules: [{ required: true, message: '请选择性别！' }],
                  })(
                    <Select>
                      <Select.Option value="男">男</Select.Option>
                      <Select.Option value="女">女</Select.Option>
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
                rules: [{ message: '请填写手机号！' }],
              })(<Input placeholder="请填写手机号" />)}
            </Form.Item>
            {showAdd ? (
              <Form.Item {...formItemLayout} label="工号">
                {getFieldDecorator('jobNumber', {
                  initialValue: (initialValue && initialValue.jobNumber) || '',
                  rules: [{ required: true, message: '请填写工号！' }],
                })(<Input placeholder="请填写工号" />)}
              </Form.Item>
            ) : (
              ''
            )}
            <Form.Item {...formItemLayout} label="所属小组">
              {getFieldDecorator('groupName', {
                initialValue: (initialValue && initialValue.groupName) || getMessage.groups[0].id,
                rules: [{ required: true, message: '请选择小组！' }],
              })(
                <Select>
                  {getMessage.groups.map(item => (
                    <Select.Option id={item.id} key={item.id} value={item.id}>
                      {item.name}
                    </Select.Option>
                  ))}
                </Select>
              )}
            </Form.Item>
            <Form.Item {...formItemLayout} label="推广地址">
              {getFieldDecorator('site', {
                initialValue: (initialValue && initialValue.site) || getMessage.sites[0],
                rules: [{ required: true, message: '请选择推广地址！' }],
              })(
                <Select placeholder="请选择推广地址">
                  {getMessage.sites.map(item => (
                    <Select.Option id={item} key={item} value={item}>
                      {item}
                    </Select.Option>
                  ))}
                </Select>
              )}
            </Form.Item>
            <Form.Item {...formItemLayout} label="推广码">
              {getFieldDecorator('promoCode', {
                initialValue: initialValue && initialValue.promoCode.split(' '),
                rules: [{ required: true, message: '请选择推广码！' }],
              })(<Checkbox.Group options={options} />)}
            </Form.Item>
          </Form>
        ) : (
          ''
        )}
      </Modal>
    );
  }
}

export default MemberEditor;

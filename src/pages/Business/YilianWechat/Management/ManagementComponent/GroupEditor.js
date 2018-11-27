import React, { Component } from 'react';
import { connect } from 'dva';
import { Form, Modal, Input, Select } from 'antd';

const mapStateToProps = state => ({
  createLoading: state.loading.effects['businessYilianWechatManagement/createGroup'],
  modifyLoading: state.loading.effects['businessYilianWechatManagement/createGroup'],
});

const mapDispatchToProps = dispatch => ({
  onCreateGroup: postData =>
    dispatch({
      type: 'businessYilianWechatManagement/createGroup',
      payload: { postData },
    }),
  onModifyGroup: postData =>
    dispatch({
      type: 'businessYilianWechatManagement/modifyGroup',
      payload: { postData },
    }),
});

@connect(
  mapStateToProps,
  mapDispatchToProps
)
@Form.create()
class GroupEditor extends Component {
  handleSubmit = e => {
    e.preventDefault();
    const { form, onCreateGroup, onModifyGroup, onClose, initialValue } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (!err && !initialValue) {
        const postData = {
          name: values.name,
          leader: values.leader,
          remark: values.remark,
          valid: values.valid,
        };
        onCreateGroup(postData).then(ifsuccess => {
          if (ifsuccess) {
            onClose();
          }
        });
      } else if (!err && initialValue) {
        const postData = {
          id: initialValue.id,
          name: values.name,
          leader: values.leader,
          remark: values.remark,
          valid: values.valid,
        };
        onModifyGroup(postData).then(ifsuccess => {
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
      initialValue,
      createLoading,
      modifyLoading,
      onClose,
      form: { getFieldDecorator },
    } = this.props;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 },
      },
    };

    return (
      <Modal
        title="新增/编辑"
        centered
        visible={visible}
        onOk={this.handleSubmit}
        okButtonProps={{ htmlType: 'submit' }}
        confirmLoading={createLoading || modifyLoading}
        onCancel={onClose}
      >
        {visible ? (
          <Form>
            <Form.Item {...formItemLayout} label="组名">
              {getFieldDecorator('name', {
                initialValue: (initialValue && initialValue.name) || '',
                rules: [{ required: true, message: '请填写组名' }],
              })(<Input placeholder="请填写组名" />)}
            </Form.Item>
            <Form.Item {...formItemLayout} label="负责人">
              {getFieldDecorator('leader', {
                initialValue: (initialValue && initialValue.leader) || '',
                rules: [{ required: true, message: '请填写负责人姓名' }],
              })(<Input placeholder="请填写负责人姓名" />)}
            </Form.Item>
            <Form.Item {...formItemLayout} label="备注">
              {getFieldDecorator('remark', {
                initialValue: (initialValue && initialValue.remark) || '',
              })(<Input placeholder="请填写备注" />)}
            </Form.Item>
            <Form.Item {...formItemLayout} label="是否有效">
              {getFieldDecorator('valid', {
                initialValue: (initialValue && `${initialValue.valid}`) || 'true',
                rules: [{ required: true, message: '请选择是否有效' }],
              })(
                <Select>
                  <Select.Option value="true">有效</Select.Option>
                  <Select.Option value="false">无效</Select.Option>
                </Select>
              )}
            </Form.Item>
          </Form>
        ) : (
          ''
        )}
      </Modal>
    );
  }
}

export default GroupEditor;

import React, { Component } from 'react';
import { connect } from 'dva';
import { Form, Modal, Input, Select } from 'antd';

const mapStateToProps = state => ({
  createLoading: state.loading.effects['businessYilianWechatManagement/createLocation'],
  modifyLoading: state.loading.effects['businessYilianWechatManagement/createLocation'],
});

const mapDispatchToProps = dispatch => ({
  onCreateLocation: postData =>
    dispatch({
      type: 'businessYilianWechatManagement/createLocation',
      payload: { postData },
    }),
  onModifyLocation: postData =>
    dispatch({
      type: 'businessYilianWechatManagement/modifyLocation',
      payload: { postData },
    }),
});

@connect(
  mapStateToProps,
  mapDispatchToProps
)
@Form.create()
class LocationEditor extends Component {
  componentDidMount() {
    console.log(123);
  }

  handleSubmit = e => {
    e.preventDefault();
    const { form, onCreateLocation, onModifyLocation, onClose, initialValue } = this.props;
    form.validateFieldsAndScroll((err, value) => {
      if (!err && !initialValue) {
        const postData = {
          hosName: value.hosName,
          remark: value.remark,
          valid: value.valid,
        };
        onCreateLocation(postData).then(ifsuccess => {
          if (ifsuccess) {
            onClose();
          }
        });
      } else if (!err && initialValue) {
        const postData = {
          id: initialValue.id,
          hosName: value.hosName,
          remark: value.remark,
          valid: value.valid,
        };
        onModifyLocation(postData).then(ifsuccess => {
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
            <Form.Item {...formItemLayout} label="名称">
              {getFieldDecorator('hosName', {
                initialValue: (initialValue && initialValue.hosName) || '',
                rules: [{ required: true, message: '请填写地址名称' }],
              })(<Input placeholder="请填写地址名称" />)}
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

export default LocationEditor;

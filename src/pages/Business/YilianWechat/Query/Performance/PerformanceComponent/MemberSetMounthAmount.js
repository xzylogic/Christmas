import React, { Component } from 'react';
import { connect } from 'dva';
import { Form, Modal, Input } from 'antd';

const mapStateToProps = state => ({
  createLoading: state.loading.effects['businessYilianWechatQuery/createMemberMonthAmount'],
});

const mapDispatchToProps = dispatch => ({
  onCreateMemberMonthAmount: postData =>
    dispatch({
      type: 'businessYilianWechatQuery/createMemberMonthAmount',
      payload: { postData },
    }),
});

@connect(
  mapStateToProps,
  mapDispatchToProps
)
@Form.create()
class MemberSetMounthAmount extends Component {
  handleSubmit = e => {
    e.preventDefault();
    const { form, onCreateMemberMonthAmount, onClose } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const postData = {
          name: values.name,
          mFansCount: values.mFansCount,
          mRegCount: values.mRegCount,
        };
        onCreateMemberMonthAmount(postData).then(ifsuccess => {
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
      onClose,
      createLoading,
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

    return (
      <Modal
        title="月指标量"
        centered
        visible={visible}
        onOk={this.handleSubmit}
        onCancel={onClose}
        okButtonProps={{ htmlType: 'submit' }}
        confirmLoading={createLoading}
      >
        <Form.Item {...formItemLayout} label="姓名">
          {getFieldDecorator('name', {
            rules: [{ required: true, message: '请填写姓名！' }],
          })(<Input placeholder="请填写姓名" />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="注册量">
          {getFieldDecorator('mRegCount', {
            rules: [{ required: true, message: '请填写注册量！' }],
          })(<Input placeholder="请填写注册量" />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="关注量">
          {getFieldDecorator('mFansCount', {
            rules: [{ required: true, message: '请填写关注量！' }],
          })(<Input placeholder="请填写关注量" />)}
        </Form.Item>
      </Modal>
    );
  }
}

export default MemberSetMounthAmount;

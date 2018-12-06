import React, { Component } from 'react';
import { connect } from 'dva';
import { Form, Modal, Input, Select } from 'antd';

const mapStateToProps = state => ({
  createLoading: state.loading.effects['businessYilianWechatQuery/createGroupMonthAmount'],
  getQueryMessage: state.businessYilianWechatQuery.list.queryMessage,
});

const mapDispatchToProps = dispatch => ({
  onCreateGroupMonthAmount: postData =>
    dispatch({
      type: 'businessYilianWechatQuery/createGroupMonthAmount',
      payload: { postData },
    }),
});

@connect(
  mapStateToProps,
  mapDispatchToProps
)
@Form.create()
class GroupSetMounthAmount extends Component {
  handleSubmit = e => {
    e.preventDefault();
    console.log('OK');
    const { form, onCreateGroupMonthAmount, onClose } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const postData = {
          name: values.name,
          mFansCount: values.mFansCount,
          mRegCount: values.mRegCount,
        };
        onCreateGroupMonthAmount(postData).then(ifsuccess => {
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
      getQueryMessage,
      createLoading,
      //   modifyLoading,
      //   getMessage,
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
        {visible ? (
          <Form.Item {...formItemLayout} label="小组">
            {getFieldDecorator('name', {
              initialValue: getQueryMessage.names[0],
              rules: [{ message: '请选择小组！' }],
            })(
              <Select>
                {getQueryMessage.names.map(item => (
                  <Select.Option id={item} key={item} value={item}>
                    {item}
                  </Select.Option>
                ))}
              </Select>
            )}
          </Form.Item>
        ) : (
          ''
        )}
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

export default GroupSetMounthAmount;

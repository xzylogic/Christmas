import React, { Component } from 'react';
import { connect } from 'dva';
import { Form, Modal, Select } from 'antd';

const mapStateToProps = state => ({
  createLoading: state.loading.effects['businessYilianWechatManagement/addHosToGroup'],
  modifyLoading: state.loading.effects['businessYilianWechatManagement/addHosToGroup'],
});

const mapDispatchToProps = dispatch => ({
  onAddHosToGroup: postData =>
    dispatch({
      type: 'businessYilianWechatManagement/addHosToGroup',
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
class GroupHosEditor extends Component {
  state = {
    size: 'default',
  };

  handleSubmit = e => {
    e.preventDefault();
    const { form, onAddHosToGroup, onClose } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const postData = {
          groupId: values.name,
          hosId: values.hosName,
        };
        onAddHosToGroup(postData).then(ifsuccess => {
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
      createLoading,
      modifyLoading,
      onClose,
      form: { getFieldDecorator },
      allValiGroupName,
      allValiHosName,
    } = this.props;
    const { size } = this.state;

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
        title="编辑组别"
        centered
        visible={visible}
        onOk={this.handleSubmit}
        okButtonProps={{ htmlType: 'submit' }}
        confirmLoading={createLoading || modifyLoading}
        onCancel={onClose}
      >
        {allValiHosName instanceof Object && allValiGroupName instanceof Object ? (
          <Form>
            <Form.Item {...formItemLayout} label="医院">
              {getFieldDecorator('hosName', {
                rules: [{ required: true, message: '请选择医院！' }],
              })(
                <Select
                  mode="multiple"
                  size={size}
                  placeholder="请选择医院"
                  // onChange={this.handleChange}
                  style={{ width: 315 }}
                  getPopupContainer={triggerNode => triggerNode.parentNode}
                >
                  {allValiHosName.map(item => (
                    <Select.Option id={item} key={item} value={item.id}>
                      {item.name}
                    </Select.Option>
                  ))}
                </Select>
              )}
            </Form.Item>
            <Form.Item {...formItemLayout} label="添加到组别">
              {getFieldDecorator('name', {
                rules: [{ required: true, message: '请选择小组！' }],
              })(
                <Select
                  size={size}
                  placeholder="请选择小组"
                  style={{ width: 115 }}
                  getPopupContainer={triggerNode => triggerNode.parentNode}
                >
                  {allValiGroupName.map(item => (
                    <Select.Option id={item.id} key={item.id} value={item.id}>
                      {item.name}
                    </Select.Option>
                  ))}
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

export default GroupHosEditor;

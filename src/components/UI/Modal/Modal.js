import React, { PureComponent } from 'react';
import { Modal } from 'antd';

class MyModal extends PureComponent {
  render() {
    const { title, content, visible, confirmLoading, handleCancel, handleOk } = this.props;
    return (
      <Modal
        title={title}
        visible={visible}
        onOk={handleOk}
        confirmLoading={!!confirmLoading}
        onCancel={handleCancel}
      >
        <p>{content}</p>
      </Modal>
    );
  }
}

export default MyModal;

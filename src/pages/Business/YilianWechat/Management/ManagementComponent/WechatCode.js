import React, { Component } from 'react';
import { Modal } from 'antd';

class WechatCode extends Component {
  handleOk = e => {
    console.log('handleOk', e);
  };

  render() {
    const { showCode, onClose, imgUrl } = this.props;
    return (
      <div>
        <Modal
          title="微信二维码"
          visible={showCode}
          centered
          onCancel={onClose}
          onOk={this.handleOk}
          footer={null}
        >
          <img src={imgUrl} alt="" style={{ display: 'block', margin: '0 auto' }} />
        </Modal>
      </div>
    );
  }
}

export default WechatCode;

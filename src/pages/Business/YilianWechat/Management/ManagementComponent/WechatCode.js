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
          {/* {
            <img
              src="http://www.wwei.cn/qrcode-viewfile?type=qrcode_text&k=qN3Xz&hash=31d84c9c3a2e1e8d37e191a5ec90d648&timeout=1543827340&size=100"
              alt=""
            />
          } */}
          <img src={imgUrl} alt="" style={{ display: 'block', margin: '0 auto' }} />
        </Modal>
      </div>
    );
  }
}

export default WechatCode;

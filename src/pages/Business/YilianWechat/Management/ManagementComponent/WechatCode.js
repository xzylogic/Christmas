import React, { Component } from 'react';
import { Modal } from 'antd';

class WechatCode extends Component {
  handleOk = e => {
    console.log(e);
    // this.setState({
    //   visible: true,
    // });
  };

  render() {
    const { showCode, onClose, wechatCode } = this.props;

    // console.log(this.props)
    return (
      <div>
        <Modal
          title="微信二维码"
          visible={showCode}
          centered="true"
          onCancel={onClose}
          onOk={this.handleOk}
        >
          <img src={wechatCode} alt="" />
        </Modal>
      </div>
    );
  }
}

export default WechatCode;

import React, { Component } from 'react';
import { Modal } from 'antd';

class WechatCode extends Component {
  handleOk = e => {
    console.log(e);

    // var a = document.createElement('a');
    // a.href = "http://www.wwei.cn/qrcode-viewfile?type=qrcode_text&k=qN3Xz&hash=31d84c9c3a2e1e8d37e191a5ec90d648&timeout=1543827340&size=100";
    // a.click();
    // var a = document.createElement('a');
    // // 创建一个单击事件
    // var event = new MouseEvent('click');

    // // 将a的download属性设置为我们想要下载的图片名称，若name不存在则使用‘下载图片名称’作为默认名称
    // a.download = name || '下载图片名称';
    // // 将生成的URL设置为a.href属性
    // a.href =
    //   'http://www.wwei.cn/qrcode-viewfile?type=qrcode_text&k=qN3Xz&hash=31d84c9c3a2e1e8d37e191a5ec90d648&timeout=1543827340&size=100';

    // // 触发a的单击事件
    // a.dispatchEvent(event);

    // this.setState({
    //   visible: true,
    // });
  };

  render() {
    const { showCode, onClose } = this.props;

    // console.log(this.props)
    return (
      <div>
        <Modal
          title="微信二维码"
          visible={showCode}
          centered
          onCancel={onClose}
          onOk={this.handleOk}
        >
          {
            <img
              src="http://www.wwei.cn/qrcode-viewfile?type=qrcode_text&k=qN3Xz&hash=31d84c9c3a2e1e8d37e191a5ec90d648&timeout=1543827340&size=100"
              alt=""
            />
          }
          {/* <img src={imgUrl} alt="" /> */}
        </Modal>
      </div>
    );
  }
}

export default WechatCode;

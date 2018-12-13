import React from 'react';
import { Modal } from 'antd';

function WechatCode(props) {
  const { showCode, onClose, imgUrl } = props;
  return (
    <div>
      <Modal title="微信二维码" visible={showCode} centered onCancel={onClose} footer={null}>
        <img src={imgUrl} alt="" style={{ display: 'block', margin: '0 auto' }} />
      </Modal>
    </div>
  );
}

export default WechatCode;

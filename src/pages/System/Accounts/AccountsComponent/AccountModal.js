import React, { Component } from 'react';
import { connect } from 'dva';
import { Modal } from 'antd';

const mapStateToProps = state => ({
  modalType: state.account.modalType,
  modalVisible: state.account.modalVisible,
  modalLoading: state.account.modalLoading,
  selectedAccount: state.account.selectedAccount,
});

const mapDispatchToProps = dispatch => ({
  onAccountModalClose: () =>
    dispatch({
      type: 'account/closeAccountModal',
    }),
  onChangeAccountState: (id, state) =>
    dispatch({
      type: 'account/toggleAccountState',
      payload: { id, state },
    }),
  onResetAccountPwd: id =>
    dispatch({
      type: 'account/resetAccountPassword',
      payload: { id },
    }),
  onDeleteAccount: id =>
    dispatch({
      type: 'account/deleteAccount',
      payload: { id },
    }),
});

@connect(
  mapStateToProps,
  mapDispatchToProps
)
class AccountModal extends Component {
  handleOk = e => {
    e.preventDefault();
    const {
      modalType,
      selectedAccount,
      onChangeAccountState,
      onResetAccountPwd,
      onDeleteAccount,
    } = this.props;
    if (modalType === 'state') {
      onChangeAccountState(selectedAccount.id, !selectedAccount.isDelete);
    }
    if (modalType === 'reset') {
      onResetAccountPwd(selectedAccount.id);
    }
    if (modalType === 'delete') {
      onDeleteAccount(selectedAccount.id);
    }
  };

  handleCancel = e => {
    e.preventDefault();
    const { onAccountModalClose } = this.props;
    onAccountModalClose();
  };

  render() {
    const { modalVisible, modalLoading, selectedAccount, modalType } = this.props;
    let modal = '';
    if (modalVisible) {
      let modalContent = '';
      if (modalType === 'state') {
        const changeText = selectedAccount.isDelete === true ? '禁用' : '启用';
        modalContent = `你确定要${changeText}账号${selectedAccount.username}？`;
      }
      if (modalType === 'reset') {
        modalContent = `你确定要重置账号${selectedAccount.username}的密码为：123456？`;
      }
      if (modalType === 'delete') {
        modalContent = `你确定要删除账号${selectedAccount.username}？`;
      }
      modal = (
        <Modal
          title="提示信息"
          visible={modalVisible}
          onOk={this.handleOk}
          confirmLoading={modalLoading}
          onCancel={this.handleCancel}
          centered
        >
          <p>{modalContent}</p>
        </Modal>
      );
    }
    return modal;
  }
}

export default AccountModal;

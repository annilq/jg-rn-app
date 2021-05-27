import React from 'react';
import { connect } from 'react-redux';

import { notification, Button, Divider } from 'antd';
import { RedoOutlined, ArrowRightOutlined, UploadOutlined, FieldTimeOutlined } from '@ant-design/icons';

function DetailActions(props) {
  const { data, dispatch, formCode, config = { approvable: "", formName: "" } } = props;
  const {
    id,
    approveProcessId,
    approveInstanceId,
    actionType,
    adminType,
    canUrge,
    canRevoke
  } = data;
  const { approvable, formName } = config;

  function handleClose() {
    // 如果从消息进入，则调用此方法可以直接关闭webView，所以不能用history.goBack
    NativeUtil.use("popWebHistory")
  }

  function approve() {
    dispatch({
      type: 'jgTableModel/approve',
      payload: {
        ...data,
        id,
        approvable,
        formCode,
        formName,
        approveProcessId,
      },
      callback: () => {
        notification.success({
          duration: 2,
          onClose() {
            handleClose()
          },
          message: '提交审批成功'
        });
        dispatch({
          type: 'jgTableModel/listRemote',
        });
      },
    });
  }

  function revoke() {
    dispatch({
      type: 'workflow/revoke',
      payload: {
        instanceId: approveInstanceId,
      },
      callback: () => {
        notification.success({
          duration: 2,
          onClose() {
            handleClose()
          },
          message: '撤回审批成功'
        });
      },
    });
  }

  function forcePass() {
    dispatch({
      type: 'workflow/forcePass',
      payload: {
        instanceId: approveInstanceId,
      },
      callback: () => {
        notification.success({
          duration: 2,
          onClose() {
            handleClose()
          },
          message: '审批成功'
        });
        dispatch({ type: 'jgTableModel/pageRemote' });
      },
    });
  }

  function remind() {
    dispatch({
      type: 'workflow/remind',
      payload: {
        instanceId: approveInstanceId,
      },
      callback: () => {
        notification.success({ message: '催办成功' });
      },
    });
  }

  let showApproveBtn = false;
  if (approvable && approveProcessId && actionType === 'write') {
    showApproveBtn = true;
  }
  return (
    <div className="actionBtns" style={{ boxShadow: "0 0 8px 0 #8c8c8c" }}>
      {adminType === 'Y' && (
        <Button style={{
          // backgroundColor: '#ffa646',
          // color: '#fff',
          border: 'none',
        }}
          onClick={() => forcePass()}>
          <ArrowRightOutlined />  强制通过
        </Button>
      )}
      {showApproveBtn && (
        <Button style={{
          // backgroundColor: '#ffa646',
          // color: '#fff',
          border: 'none',
        }}
          onClick={() => approve()}>
          <UploadOutlined />  提交审批
        </Button>
      )}
      {canUrge === "Y" && (
        <Button style={{
          // backgroundColor: '#ffa646',
          // color: '#fff',
          border: 'none',
        }}
          onClick={() => remind()}>
          <FieldTimeOutlined />  催办
        </Button>)}
      {canRevoke === 'Y' && (
        <>
          <Divider type="vertical" style={{ height: "28px", color: "#f5f5f5" }} />
          <Button style={{
            // backgroundColor: '#ffa646',
            // color: '#fff',
            border: 'none',
          }}
            onClick={() => revoke()}>
            <RedoOutlined /> 撤回
        </Button></>
      )}
    </div>
  );
}
export default connect()(DetailActions);

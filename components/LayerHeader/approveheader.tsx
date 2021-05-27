import React from 'react';
import { connect } from 'react-redux';
import {
  CloseCircleOutlined,
  CheckCircleOutlined,
  RedoOutlined,
  CheckOutlined,
} from '@ant-design/icons';

import { notification } from 'antd';

import IconFont from '@/components/IconFont';

import ZoomPage from '@/components/Layer/ZoomLayer';
import useFormConfig from '@/hooks/useFormConfig';

import styles from './index.less';

function ApproveHeader(props) {
  const { data, dispatch, onClose, formCode, children } = props;
  const {
    sysVersionId,
    versionId,
    id,
    approveProcessId,
    approveInstanceId,
    actionType,
    adminType,
    canUrge,
    canRevoke,
  } = data;
  const { tableConfig } = useFormConfig(formCode, { sysVersionId, versionId });
  const { approvable, formName } = tableConfig;

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
        notification.success({ message: '提交审批成功', getContainer: () => document.fullscreenElement || document.body });
        dispatch({
          type: 'jgTableModel/listRemote',
        });
        onClose();
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
        notification.success({ message: '撤回审批成功', getContainer: () => document.fullscreenElement || document.body });
        dispatch({ type: 'jgTableModel/pageRemote' });
        onClose();
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
        notification.success({ message: '审批成功', getContainer: () => document.fullscreenElement || document.body });
        dispatch({ type: 'jgTableModel/pageRemote' });
        onClose();
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
        notification.success({
          message: '催办成功',
          getContainer: () => document.fullscreenElement || document.body
        });
      },
    });
  }

  let showApproveBtn = false;
  if (approvable && approveProcessId && actionType === 'write') {
    showApproveBtn = true;
  }
  return (
    <div className={styles['layer-header']}>
      <div>{children}</div>
      <div className={styles['button-wrapper']}>
        {adminType === 'Y' && (
          <div onClick={() => forcePass()}>
            <CheckOutlined />
            强制通过
          </div>
        )}
        {showApproveBtn && (
          <div onClick={() => approve()}>
            <CheckCircleOutlined />
            提交审批
          </div>
        )}
        {canUrge === 'Y' && (
          <div onClick={() => remind()}>
            <IconFont icon="Urge" width="12px" height="12px" />
            催办
          </div>
        )}
        {canRevoke === 'Y' && (
          <div onClick={() => revoke()}>
            <RedoOutlined />
            撤回
          </div>
        )}
        {/* <div>
          <Icon type="printer" />
          打印
        </div> */}
        <div onClick={onClose}>
          <CloseCircleOutlined />
          关闭
        </div>
        <ZoomPage selector=".drawer .ant-drawer-content-wrapper" />
      </div>
    </div>
  );
}
export default connect()(ApproveHeader);

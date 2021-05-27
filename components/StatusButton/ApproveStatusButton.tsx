import React from 'react';
import { Tag } from 'antd';
import cx from 'classnames';
import colorstyles from '@/components/StatusButton/index.less';

function StatusButton(props) {
  const { status, ...rest } = props;
  const getApprovalStatusText = status => {
    switch (status) {
      case 'UNDERWAY':
        return '审批中';
      case 'REJECT':
        return '审批驳回';
      case 'COMPLETE':
        return '审批完成';
      case 'REVOKE':
        return '撤回';
      default:
        return '未提交审批';
    }
  };

  const getApprovalStatusColor = status => {
    switch (status) {
      case 'UNDERWAY':
        return 'status4';
      case 'REJECT':
        return 'status3';
      case 'COMPLETE':
        return 'status1';
      case 'REVOKE':
        return 'status2';
      default:
        return 'status0';
    }
  };
  return (
    <Tag className={cx(colorstyles.approveStatus, [colorstyles[getApprovalStatusColor(status)]])} {...rest}>
      {getApprovalStatusText(status)}
    </Tag>
  );
}

export default StatusButton;

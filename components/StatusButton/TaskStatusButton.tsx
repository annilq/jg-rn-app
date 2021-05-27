import React from 'react';
import { Tag } from 'antd';
import cx from 'classnames';
import colorstyles from '@/components/StatusButton/index.less';

function TaskStatusButton(props) {
  const { data, ...rest } = props;
  const getTaskStatusColor = status => {
    switch (status) {
      case 'STOP':
        return 'status2';
      case 'RUNNING':
      case 'SUBMIT':
        return 'status4';
      case 'REJECT':
        return 'status3';
      case 'FINISH':
        return 'status1';
      case 'CANCEL':
      case 'INIT':
        return 'status0';
      default:
        return '#000';
    }
  };

  return (
    <Tag
      className={cx(colorstyles.taskStatus, [colorstyles[getTaskStatusColor(data.taskStatus)]])} {...rest}
    >
      {data.taskStatusDesc}
    </Tag>
  );
}

export default TaskStatusButton;

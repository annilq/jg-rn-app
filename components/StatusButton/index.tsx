import React from 'react';
import { DataSelecter } from '@/components/CustomForm';
import cx from 'classnames';

import styles from './index.less';

function StatusButton(props) {
  const { data = {}, active } = props;
  return (
    <DataSelecter
      extraProps={{
        flag: 'inspectStatusMap',
        type: 2,
      }}
      store={window.g_app._store}
    >
      {candidates => {
        const obj = candidates.find(item => item.value == data.judgeType);
        // 待检查不在数据字典里面，是系统生成的，可能找不到，就用它来作为默认值
        let styleType = 'status0';
        let styleText = obj && obj.label || '待检查';
        switch (parseInt(data.judgeType, 10)) {
          case 0:
            styleType = 'status0';
            break;
          case 1:
            styleType = 'status1';
            break;
          case 2:
            styleType = 'status2';
            break;
          case 3:
            styleType = 'status3';
            break;
          default:
            break;
        }
        return <div className={cx(styles.statusButton, active ? styles[styleType] : styles.default)}>{styleText}</div>;
      }}
    </DataSelecter>
  );
}

export function ReformStatusButton(props) {
  const { data = {} } = props;
  return (
    <DataSelecter
      extraProps={{
        flag: 'inspectReformStatusMap',
        type: 2,
      }}
      store={window.g_app._store}
    >
      {candidates => {
        const obj = candidates.find(item => item.value == data.status);
        let styleType = 'status1';
        switch (parseInt(data.status, 10)) {
          case 0:
            styleType = 'status2';
            break;
          case 1:
            styleType = 'status4';
            break;
          case 2:
            styleType = 'status1';
            break;
          case 3:
            styleType = 'status3';
            break;
          default:
            break;
        }
        return obj && <div className={cx(styles.statusButton, styles[styleType])}>{obj.label}</div>;
      }}
    </DataSelecter>
  );
}

export default StatusButton;

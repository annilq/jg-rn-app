import React from 'react';
import cx from 'classnames';

import styles from '@/components/StatusButton/index.less';

function StatusButton(props) {
  // 0-待检查
  // 1-通过
  // 2-口头警告
  // 3-书面整改（未发）
  // 4-书面整改（已发）
  const { data } = props;
  let styleType = 'pass';
  let styleText = '';
  switch (parseInt(data, 10)) {
    case 0:
      styleType = 'status0';
      styleText = '待检查'
      break;
    case 1:
      styleType = 'status1';
      styleText = '通过';
      break;
    case 2:
      styleType = 'status2';
      styleText = '口头警告';
      break;
    case 3:
      styleType = 'status3';
      styleText = '书面整改(未发)';

      break;
    case 4:
      styleType = 'status5';
      styleText = '书面整改(已发)';
      break;
    default:
      break;
  }
  return <div className={cx(styles.statusButton, styles[styleType])}>{styleText}</div>;
}

export default StatusButton;

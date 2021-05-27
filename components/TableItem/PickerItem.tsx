import React, { useState, useEffect } from 'react';

import styles from './index.less';

interface IProps {
  showIndicator?: boolean;
  customCols?: any[];
  [index: string]: any;
}

function TableItemCell(props: IProps) {
  const { columns = [], data = {} } = props;
  // 默认显示三条
  const defalutColsLength = 3
  const cols = columns.slice(0, defalutColsLength);
  return (
    <div className={styles['list-item']}>
      <div className={styles['list-item-container']}>
        <div className={styles['list-item-content']} style={{ padding: "10px 0" }}>
          {cols.map((column, index) => (
            <div key={column.title} data-from="datapicker">
              <div style={{ maxWidth: 120 ,minWidth: 70 }}>{column.title}:</div>
              {column.render
                ? column.render(data[column.dataIndex], data, index)
                : (data[column.dataIndex] || "无数据")}
            </div>
          ))}
        </div>
      </div>
    </div >
  );
}

export default TableItemCell;

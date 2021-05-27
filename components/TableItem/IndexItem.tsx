import React from 'react';
import styles from './index.less';

interface IProps {
  data: any;
  showIndicator?: boolean;
  columns: any[];
  onItemClick?: (params: any) => void;
  children?: any
}

function TableItemCell(props: IProps) {
  const { columns = [], data = {}, onItemClick, children } = props;
  // 默认显示三条
  const defalutColsLength = 5
  const cols = columns.slice(0, defalutColsLength);
  return (
    <div
      className={styles['list-item']}
      onClick={onItemClick}
    >
      <div className={styles['list-item-container']}>
        <div className={styles['list-item-content']} style={{ padding: "8px 0px" }}>
          {cols.map((column, index) => (
            <div key={column.title} data-from="datalist">
              <div
                style={{
                  wordBreak: "keep-all",
                  whiteSpace: "nowrap",
                }}
              >
                {column.title}:
              </div>
              <div style={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                wordBreak: "keep-all",
                whiteSpace: "nowrap",
                flex: 1
              }}
              >
                {column.render
                  ? column.render(data[column.dataIndex], data, index)
                  : (data[column.dataIndex] || "无数据")}
              </div>
              {index === 0 && children}
            </div>
          ))}
        </div>
        <div className={styles['list-item-footer']}>
          <span> 创建人: {data.creatorName || '无'}</span> <span style={{ float: "right" }}> 创建时间:{data.createTime || '无'}</span>
        </div>
      </div>
    </div>
  );
}

export default TableItemCell;

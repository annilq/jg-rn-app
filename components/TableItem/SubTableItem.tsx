import React, { useState, useEffect, useCallback } from 'react';
import { DownOutlined, UpOutlined, FormOutlined } from '@ant-design/icons';
import { Divider } from 'antd';
import styles from './index.less';

interface IProps {
  data: any;
  columns: any[];
  // 编辑按钮回调
  onEdit?: () => void;
  // 默认是展开收起模式，遇到表格嵌套，则展示方式切换为右侧滑出页面
  onDetail?: () => void;
  index?: number
}

function TableItemCell(props: IProps) {
  const { columns = [], data = {}, index, onDetail, onEdit } = props;
  // 默认显示三条
  const defalutColsLength = 3;
  const showExpandBtn = columns.length > defalutColsLength;
  const defalutCols = columns.slice(0, defalutColsLength);
  const [cols, setCols] = useState(defalutCols);
  const [isToggle, setToggle] = useState(false);
  // 默认展开
  const toggle = useCallback(
    () => {
      if (!isToggle) {
        setCols(columns);
        setToggle(true);
      } else {
        setCols(defalutCols);
        setToggle(false);
      }
    },
    [cols, isToggle]
  );
  useEffect(
    () => {
      setCols(defalutCols);
    },
    [columns, onEdit]
  );
  const { exceedFlag } = data
  return (
    <div className={`${styles['list-item']} ${exceedFlag === "Y" ? styles["warnRow"] : ""}`} style={{ margin: "0 4px" }}>
      <div className={styles['list-item-container']}>
        <div className={styles['list-item-content']}>
          {cols.map((column) => (
            <div key={column.title} data-from="detail">
              <div style={{ maxWidth: 120, minWidth: 70 }}>{column.title}:</div>
              {column.render
                ? column.render(data[column.dataIndex], data, index)
                : (data[column.dataIndex] || "无数据")}
            </div>
          ))}
        </div>
      </div>
      {
        // 有编辑或者展开按钮都显示footer
        (showExpandBtn || onEdit) && (
          <div className={styles.indicator} >
            {showExpandBtn && (
              <div onClick={(e) => {
                e.stopPropagation();
                if (onDetail) {
                  onDetail()
                } else {
                  toggle()
                }
              }}
                className={styles.expondBtn}
              >
                {isToggle ? <>收起<UpOutlined /> </> : <>查看<DownOutlined /> </>}
              </div>)}
            {showExpandBtn && onEdit && <Divider type="vertical" style={{ height: 28, borderColor: "#d9d9d9", alignSelf: "center" }} />}
            {onEdit && (
              <div onClick={onEdit} className={styles.editBtn}>
                编辑<FormOutlined />
              </div>
            )}
          </div>
        )
      }
    </div >
  );
}

export default TableItemCell;

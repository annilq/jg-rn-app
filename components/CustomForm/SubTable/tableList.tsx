import React, { useState } from 'react';
import { List } from 'antd';
import SubTableItemCell from '@/components/TableItem/SubTableItem';
import Layer from '@/components/Layer';
import useLayerVisible from '@/hooks/useLayer';

import Detail from '@/components/CustomForm/detail/detail';
import styles from '@/components/CustomForm/index.less';

import FormItemData from '@/components/CustomForm/FormItem/detail';
import { getColumnsFromContainersByFliter, getSumRows, getSumRowsRender, getSumData } from '@/components/CustomForm/FormUtil';

interface IProps {
  value: any[] | any;
  onEdit?: (index: any) => void;
  showDetail?: (index: any) => void;
  containers: any[];
  omitCols?: string[]
  // 是否可展开(子表中包含子表)
  expandable?: {
    expandedRowRender: (record: any) => React.ReactElement;
    rowExpandable: (record: any) => boolean,
  }
}

function TableList(props: IProps) {
  const { containers = [], value, onEdit, omitCols, expandable: {
    rowExpandable = (record: any) => false,
    expandedRowRender = (record: any) => false
  } = {} } = props;

  const [visible, setVisible] = useLayerVisible(false);
  const [recordIndex, setRecordIndex] = useState(-1);
  const record = value[recordIndex]

  const showDetail = function (index: number) {
    setVisible(true);
    setRecordIndex(index);
  }

  const getTableColumns = function (columnsData) {
    const columns = columnsData.map(item => ({
      title: item.controlLabel,
      render: (_, record) => <FormItemData data={item} formdata={record} />,
      dataIndex: item.controlCode,
      // width: 200,
    }));
    return columns;
  };

  const controls = getColumnsFromContainersByFliter(containers);
  const sumCols = getSumRowsRender(controls);
  const sumData = getSumData(value, controls, getSumRows(controls));
  let newcolumns = getTableColumns(controls);
  // start 过滤掉需要删除的列 (added by hmy)
  if (omitCols) {
    newcolumns = newcolumns.filter((item) => omitCols.indexOf(item.dataIndex) < 0);
  }
  return (
    <>
      <List
        renderItem={(item, index) => {
          const { exceedFlag } = item
          return (
            <List.Item style={{ width: "100%" }}>
              <>
                <SubTableItemCell
                  data={item}
                  columns={newcolumns}
                  {...onEdit && { onEdit: () => onEdit(index) }}
                  // 有嵌套子表的则用新页面展示详情
                  {...rowExpandable(item) && { onDetail: () => showDetail(index) }}
                />
                {exceedFlag === "Y" && <div style={{ color: "#ff4d4d", fontSize: "12px", width: "100%", lineHeight: "40px" }}>*数据已超过计划份额</div>}
              </>
            </List.Item>
          )
        }}
        locale={{ emptyText: '暂无数据' }}
        dataSource={value}
        split={false}
      />
      {/* 合计 */}
      {sumCols.length > 0 && value.length > 0 && (
        <>
          <div style={{ lineHeight: "40px", fontSize: "16px", paddingLeft: 4, color: "#000" }}>合计</div>
          <SubTableItemCell
            data={sumData}
            columns={sumCols}
          />
        </>
      )}

      <Layer
        type="drawer"
        visible={visible}
        width="100%"
      >
        {record && (
          <div className={styles.baseForm}>
            <Detail
              containers={containers}
              formdata={record}
            >
              {
                /* 
                子表目前不会存在自定义表单和手写代码混合的情况
                可以直接引用@/components/CustomForm/detail/detail组件 
                后续如果有这种情况再将下面代码提出
              */
              }
              {rowExpandable(record) && expandedRowRender(record)}
            </Detail>
          </div>)}
      </Layer>
    </>
  );
}

export default TableList;

import React from 'react';
import { List } from 'antd';

import tableStyles from "@/components/CustomForm/SubTable/index.less"
import DataList from '@/components/DataList';
import SubTableItemCell from '@/components/TableItem/SubTableItem';
import { getColumnsFromContainersByFliter } from '@/components/CustomForm/FormUtil';
import FormItemData from '@/components/CustomForm/FormItem/detail';

interface IProps {
  value: any;
  containers: any[];
  loading: boolean;
  loadMore: (params: any) => void;
}

function SubTableDetail(props: IProps) {
  // console.log(data, tableConfig);
  const { containers, value, loading, loadMore } = props;
  // 详情的value 中有版本信息

  function getTableColumns(columnsData) {
    const columns = columnsData.map(item => ({
      title: item.controlLabel,
      render: (_, record) => <FormItemData data={item} formdata={record} />,
      dataIndex: item.controlCode,
      // width: 200,
    }));
    return columns;
  };

  const controls = getColumnsFromContainersByFliter(containers);
  const newcolumns = getTableColumns(controls);
  return (
    <div className={tableStyles.table} style={{ padding: 0, width: "100%" }}>
      <DataList
        renderItem={(item) => (
          <List.Item>
            <SubTableItemCell
              data={item}
              columns={newcolumns}
            />
          </List.Item>
        )}
        loading={loading}
        loadMore={loadMore}
        data={value}
      />
    </div>
  );
}

export default SubTableDetail;

import React from 'react';

import FormItemData from '@/components/CustomForm/FormItem/detail';
import List from '@/components/DataList';
import PickerItemCell from '@/components/TableItem/PickerItem';

import useFormConfig from '@/hooks/useFormConfig';
import { getColumnsFromContainersByFliter } from '@/components/CustomForm/FormUtil';

interface IProps {
  formCode: string;
  data: any;
  loadMore: (opthions: any) => void;
  [index: string]: any;
}

function Index(props: IProps) {
  const {
    data = {},
    formCode,
    loadMore,
    loading: dataloading,
    rowSelection,
    rowKey = "id"
  } = props;
  const { tableConfig, loading: tableloading } = useFormConfig(formCode);

  // 根据配置获取表格列表项目
  function getTableColumns(columnsData) {
    const columns = columnsData.map(item => ({
      title: item.controlLabel,
      render: (text, record) => <FormItemData data={item} formdata={record} />,
      dataIndex: item.controlCode,
      // width: 200,
    }));
    return columns;
  }
  const columnsData = getColumnsFromContainersByFliter(tableConfig.containers);
  const columns = getTableColumns(columnsData);

  const listHeight = {
    height: 'calc(100vh - 56px)',
    overflowY: 'scroll',
    paddingBottom: "70px"
  };
  return (
    <div style={listHeight}>
      <List
        renderItem={data => (
          <List.Item>
            <PickerItemCell data={data} columns={columns} />
          </List.Item >
        )}
        loading={tableloading || dataloading}
        data={data}
        loadMore={loadMore}
        rowSelection={rowSelection}
        rowKey={rowKey}
      />
    </div>
  );
}

export default Index;

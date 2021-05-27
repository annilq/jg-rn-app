import React from 'react';
import List from '@/components/DataList';
import FormItemData from '@/components/CustomForm/FormItem/detail';

import useFormConfig from '@/hooks/useFormConfig';
// import ApproveStatusButton from '@/components/StatusButton/ApproveStatusButton';
import { getColumnsFromContainersByFliter } from '@/components/CustomForm/FormUtil';

interface IProps {
  formCode: string;
  data: any;
  loading: boolean;
  tableConfig: JgFormProps.FormConfig;
  [index: string]: any;
}

function Index(props: IProps) {
  const { ListItem, onPageChanged, formCode, loading, data, showDetail } = props;

  const { tableConfig } = useFormConfig(formCode);
  const { approvable, containers } = tableConfig;

  // 获取用户设置的显示行
  function getUserSettingColumns(columns = []) {
    return columns.filter((item) => item.isdisplayInList !== false);
  }

  // 根据配置获取表格列表项目
  function getTableColumns(columnsData) {
    const columns = columnsData.map((item) => ({
      title: item.controlLabel,
      controlType: item.controlType,
      render: (text, record) => (
        <FormItemData data={item} formdata={record} />
      ),
      dataIndex: item.controlCode,
    }));
    return columns;
  }
  const controls = getColumnsFromContainersByFliter(containers);
  const columns = getTableColumns(controls);
  // 这个是显示给用户看的
  const displayInColumns = getUserSettingColumns(columns);

  // 合并起来
  // const finnalCols = displayInColumns.concat(customCols);
  // console.log(data);
  // 设置表格宽度

  return (
    <List
      renderItem={(data,index) => (
        <List.Item style={{ backgroundColor: "#fff", marginTop: 20, padding: 20 }} key={index}>
          {/* <ListItem data={data} columns={displayInColumns} onItemClick={() => showDetail(data)}>
            {approvable && <ApproveStatusButton
              status={data.approveStatus}
            />}
          </ListItem> */}
          <ListItem data={data} columns={displayInColumns} onItemClick={() => showDetail(data)} />
        </List.Item>
      )}
      data={data}
      loadMore={(params) => {
        onPageChanged(params)
      }}
      loading={loading}
    />
  );
}

export default Index;

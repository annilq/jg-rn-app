import React, { useState } from 'react';
import { Button } from 'antd';

import Layer from '@/components/Layer';
import SearchForm from '@/components/CustomForm/JgSearchForm';
import getServiceFromFormCode from '@/components/CustomForm/FormCodeService';
import styles from '@/common/styles/tableList.less';
import TablePicker from '@/components/CustomForm/DataPicker/table';
import useLayerVisible from '@/hooks/useLayer';
import { flatdata } from '@/models/jgtablemodel';

function Main(props) {
  const { 
    parentformdata,
    formCode,
    children: Children,
    defaultParams = {},
    value,
    onChange,
    rowKey = "id",
    type = "checkbox"
  } = props;

  let [{ selectedRows = [],
    selectedRowKeys = [] }, setSelectRows] = useState({
      selectedRows: [],
      selectedRowKeys: [],
    })
  const [visible, setVisible] = useLayerVisible(false)
  const [tableLoading, setTableLoading] = useState(false)
  const [data, setData] = useState({
    list: [],
  })
  const queryData = async (params, pageRemote = false) => {
    if (value) {
      selectedRows = value;
      selectedRowKeys = selectedRows.map(item => item[rowKey]);
    }
    // 系统表单，或者自定义
    const service = getServiceFromFormCode(formCode);
    setTableLoading(true);
    setVisible(true);
    setSelectRows({ selectedRowKeys, selectedRows });

    // 如果是项目面板，则所有弹出框查询需要传默认项目，并且项目不可搜索
    const response = await service.list({
      formCode: parentformdata && parentformdata.formCode,
      pageSize: 50,
      ...params,
      ...defaultParams,
      approveStatus: 'COMPLETE',
    });
    if (response) {
      const { resp } = response;
      const newList = resp.list.map(flatdata);
      if (pageRemote) {
        setData({ ...resp, list: data.list.concat(newList) });
      } else {
        setData({ ...resp, list: newList });
      }
    }
    setTableLoading(false);
  };

  const confirm = (recordkeys) => {
    // 将选择数据回传用于关联
    const records = recordkeys.map(item =>
      selectedRows.find(cur => cur && cur[rowKey || 'id'] === item)
      // 去除版本控制
    ).filter(item => !!item).map(({ exts, ...rest }) => rest);
    onChange(records);
    setVisible(false)
  };

  const cacheSeletedData = (rowKeys, rows) => {
    for (let index = 0; index < rows.length; index++) {
      const element = rows[index];
      // 如果翻页了，element数据可能为空
      if (element) {
        if (selectedRows.findIndex(item => item[rowKey] === element[rowKey]) < 0) {
          selectedRows.push(element);
        }
      }
    }
    setSelectRows({ selectedRows, selectedRowKeys: rowKeys });
  };

  // 把所有选中过的item都缓存起来，最后统一根据selectedRowKeys过滤
  const rowSelection = {
    hideDefaultSelections: true,
    type,
    onChange: cacheSeletedData,
    selectedRowKeys,
    preserveSelectedRowKeys: true
  };
  return (
    <>
      <span onClick={() => queryData()}>
        {Children}
      </span>
      <Layer
        type="drawer"
        visible={visible}
        width="100%"
        style={{ transform: 'none', overflow: "hidden" }}
      >
        <div className={styles.tableList}>
          <div className={styles.tableListForm}>
            <SearchForm
              loading={tableLoading}
              formCode={formCode}
              reset={queryData}
              onSearch={params => queryData(params)}
              style={{ marginRight: '60px' }}
            />
          </div>
          <TablePicker
            // 在编辑基础数据时候需要用到formCode获取基础表需要的服务
            loading={tableLoading}
            formCode={formCode}
            data={data}
            rowSelection={rowSelection}
            loadMore={(params) => queryData(params, true)}
            rowKey={rowKey}
          />
          <div className="actionBtns">
            <Button
              onClick={() => confirm(selectedRowKeys)}
              type="primary"
            >
              确定
            </Button>
          </div>
        </div>
      </Layer>
    </>
  );
}

export default Main;

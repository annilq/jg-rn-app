import React, { useState, useMemo } from 'react';
import { relation as api } from '@/services/api';
import useFormConfig from '@/hooks/useFormConfig';
import useFetch from '@/hooks/useFetch';

import TableList from './detailList';

interface ModuleInte {
  domainFormName: string;
  relateFormCode: string;
  domainFormCode: string;
  domainId: string;
}

interface IProps {
  domainFormCode: string;
  data: ModuleInte;
}

function RelationModule(props: IProps) {
  const { data, domainFormCode } = props;
  const { domainId, relateFormCode } = data;
  const [params, setParams] = useState(null);

  const { data: datalist = { list: [] } } = useFetch<JGListData>(api.getRelateList, { ...data, domainFormCode, domainId, ...params });
  const { data: totalData } = useFetch(api.getRelateAmount, { ...data, domainFormCode, domainId, ...params });
  const { tableConfig, loading } = useFormConfig(relateFormCode);
  const listHeight = {
    height: 'calc(100vh - 100px)',
    overflowY: 'scroll',
    padding: "0 10px"
  };
  const totalSum = useMemo(() => {
    if (totalData && Object.keys(totalData).length > 0) {
      return Object.keys(totalData).map(sumCode => {
        for (let index = 0; index < tableConfig.containers.length; index++) {
          const container = tableConfig.containers[index];
          const targetControl = container.controls.find(control => control.controlCode === sumCode);
          if (targetControl) {
            return <span style={{ marginRight: 5 }}>{targetControl.controlLabel}:{totalData[sumCode]}</span>
          }
          return false
        }
      })
    }
    return false
  }, [totalData, tableConfig])
  return (
    <>
      <div style={listHeight}>
        <TableList
          loadMore={setParams}
          value={datalist}
          containers={tableConfig.containers}
          loading={loading}
          store={window.g_app._store}
        />
      </div>
      {totalSum && (
        <div style={{
          padding: "15px 10px",
          backgroundColor: "#4095ff",
          color: "#fff",
          wordBreak: "keep-all",
          whiteSpace: "nowrap",
          overflow: "scroll"
        }}>合计：{totalSum}</div>
      )
      }
    </>
  );
}
export default RelationModule;

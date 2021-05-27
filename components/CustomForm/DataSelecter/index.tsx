import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

interface constants {
  key: string;
  value: string;
}

interface SelectorProps {
  flag: string;
  type: number;
  candidates?: [];
}

interface IProps {
  extraProps: SelectorProps;
  ConstantMap: { [index: string]: constants[] };
}
interface ConnectProps {
  constantloading?: boolean;
  children: (data: any, formProps: any) => React.ReactElement;
  dispatch?: (params: any) => void;
}
function maptoProps({ global, loading }) {
  return {
    ConstantMap: global.ConstantMap,
    constantloading: loading.effects['global/fetchGlobalConstant'] || false,
  };
}

function DataSelector(props: IProps & ConnectProps) {
  const {
    children,
    extraProps: { flag, type, candidates },
    ConstantMap,
    constantloading,
    dispatch,
    ...rest
  } = props;
  const [data, setData] = useState([]);

  useEffect(
    () => {
      switch (type) {
        case 1:
          setData(candidates);
          break;
        case 2:
          if (!flag) {
            console.warn('no flag!!!!!!!!!!!');
            return;
          }
          const mapData = ConstantMap[flag];
          if (mapData) {
            setData(tranformData(mapData));
          } 
          break;

        default:
          break;
      }
    },
    [flag, type, ConstantMap]
  );
  // 将数据转换成antd数据源的格式
  function tranformData(data) {
    return data.map(item => {
      const { value, key, ...rest } = item;
      return { label: value, value: key, ...rest };
    });
  }

  return <>{children(data, rest)}</>;
}

export default connect(maptoProps)(DataSelector);

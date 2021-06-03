import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { View, Image,Text } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

// import SearchForm from '@/components/CustomForm/JgSearchForm';
// import OperationButton from '@/components/OperationButton';
import JgTable from '@/components/CustomForm/JgTable';

import ListItemCell from '@/components/TableItem/ListItem';
import { getServiceAndFormCodeFromPath } from '@/components/CustomForm/FormCodeService';
import { getConfigFormPath } from '@/routerConfig';

function Main(props) {
  const {
    dispatch,
    tableLoading,
    jgTableModel: { data = { list: [] } },
  } = props;
  const { params: { path } } = useRoute();
  const navigation = useNavigation();
  const { formCode } = getServiceAndFormCodeFromPath(path);
  const config = getConfigFormPath(path);
  // formCode与后台服务一样的名字
  const reset = () => {
    // 查看详情需要用到base，以及子表接口
    dispatch({ type: 'jgTableModel/item', payload: {} });
    dispatch({ type: 'jgTableModel/listRemote', path });
  };

  // 展开编辑,编辑统一跳转到新页面，不在侧边滑出
  const showEdit = () => {
    navigation.navigate("Editpage",{ url: `?path=${path}&formCode=${formCode}` });
  };

  const onSearch = (params) => {
    let searchParams = {};
    // 用户全自定义的搜索条件和系统自定义搜索条件不一样
    const ISUSERCREATE = path.indexOf('usercreate') > -1;
    if (ISUSERCREATE) {
      const paramsArr = [];
      Object.keys(params).forEach((key) => {
        if (params[key] !== null && typeof params[key] !== 'undefined') {
          paramsArr.push({ [key]: params[key] });
        }
      });
      searchParams.searchParams = JSON.stringify(paramsArr);
    } else {
      searchParams = params;
    }
    searchParams.currentPage = 1
    dispatch({ type: 'jgTableModel/listRemote', path, payload: searchParams });
  };

  const onPageChanged = (params) => {
    dispatch({ type: 'jgTableModel/pageRemote', path, payload: params });
  }
  // 展开详情
  const showDetail = (record) => {
    navigation.navigate("DetailScreen",{ url: `id=${record.id}&path=${path}&formCode=${formCode}` });
  };

  // usePageEvent('onPullDownRefresh', () => {
  //   reset()
  //   return Promise.resolve()
  // });

  useEffect(() => {
    reset()
  }, []);

  // console.log(data);
  return (
    <View>
      {/* <SearchForm
        loading={tableLoading}
        formCode={formCode}
        reset={reset}
        // 用户默认的搜索框
        onSearch={onSearch}
        key={formCode}
      /> */}
      {/* <OperationButton operationType="WRITE" operations={config.operations}>
        <Image src="/images/wfqd.png" alt="新增"
          style={{
            width: 84,
            height: 84,
            position: "fixed",
            bottom: 40,
            right: 20,
            zIndex: 99
          }}
          onClick={() => showEdit()}
        />
      </OperationButton> */}
      <JgTable
        formCode={formCode}
        data={data}
        showDetail={showDetail}
        onPageChanged={onPageChanged}
        ListItem={ListItemCell}
        loading={tableLoading}
      />
    </View>
  );
}

export default connect(({ jgTableModel, loading }) => ({
  jgTableModel,
  tableLoading: loading.effects['jgTableModel/listRemote'] || false,
  detailLoading: loading.effects['jgTableModel/queryRemote'] || false,
}))(Main);

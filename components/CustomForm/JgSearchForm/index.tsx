import React from 'react';

import { ConTypes } from '@/components/CustomForm/controlTypes';
import FormSearchItem from '@/components/CustomForm/FormItem/search';
import SearchForm from '@/components/SearchForm';
import useSearchConfig from '@/hooks/useSearchConfig';
import { isProjectMode } from "@/utils/utils"

interface searchItem {
  label?: string;
  name: string;
  component: React.PureComponent;
}

interface IProps {
  searchArr?: searchItem[];
  formCode?: string;
  // 排除的搜索项
  filter?: string[];
  onSearch: (params: any) => void;
  [index: string]: any;
}


function JgSearchForm(props: IProps) {
  const { formCode, searchArr: defaultArr = [], style = {}, ...rest } = props;
  // 如果用全局state的话，关联数据的搜索框就不行了
  const [controls] = useSearchConfig(formCode);
  // 接口有数据就用接口的，没有数据就用默认配置的

  function getForms(controls = []) {
    const { filter = [] } = props;
    // 如果在项目面板则把项目选项隐藏
    if (isProjectMode()) {
      filter.push('projectId');
    }
    // 过滤相关联无需显示的查询条件(采购里面应该先查项目，再查合同)
    const final = controls
      .filter((item) => item.isSearchAble === true)
      .filter((searchItem) => filter.findIndex((item) => searchItem.controlCode === item) == -1);

    return getSearchItem(final);
  }

  function getSearchItem(searchForms = []) {
    return searchForms.map((data) => ({
      // hide labels
      // label: data.controlLabel,
      // 如果是根据项目名称查询必须要传projectName，不能传projectId，select，tree这种类型就不能根据nameCode传
      name: (data.extraProps && data.extraProps.nameCode) || data.controlCode,
      component: <FormSearchItem data={data} />,
    }));
  }

  // 获取时间查询参数
  function getDateParams() {
    const dataForms = controls
      .filter((item) => item.controlType === ConTypes.DATEPICKER)
      .map((item) => item.controlCode);
    return dataForms;
  }

  // 搜索
  function search(params) {
    const { onSearch } = props;
    const dateparams = getDateParams();
    const searchDate = {};
    dateparams.forEach((key) => {
      if (params[key]) {
        searchDate[key] = [...params[key]];
        delete params[key];
      }
    });
    if (Object.keys(searchDate).length > 0) {
      params.searchDate = JSON.stringify(searchDate);
    }
    onSearch(params);
  }
  if (formCode && controls.length === 0) {
    return false;
  }
  const searchArr = getForms(controls);
  // 用户默认的搜索条件
  const searchData = defaultArr.concat(searchArr);
  return <SearchForm {...rest} submit={search} searchArr={searchData} />;
}

export default JgSearchForm;

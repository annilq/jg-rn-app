// 已经确认过树形结构中的父级选项可以作为选择2019/7/1
import React from 'react';
import { connect } from 'react-redux';
// import { SearchOutlined } from '@ant-design/icons';

import { TextInput, View, Text } from 'react-native';
import { baseUrl } from '@/services/api';

interface TreeSelectorProps {
  type: number;
  url?: string;
  nameCode?: string;
  parentNodeDisable?: boolean;
  candidates?: any;
}

interface IProps extends JgFormProps.IFormProps {
  extraProps: TreeSelectorProps;
  disabled: boolean;
  placeholder: string;
  fetchBackEndDataloading: boolean
}

interface IStates {
  data: { id: string; name: string }[];
}

@connect(({ global, loading }) => {
  return {
    BackEndData: global.BackEndData,
    fetchBackEndDataloading: loading.effects['global/fetchBackEndData'] || false,
  };
})
class TreePicker extends React.PureComponent<IProps, IStates> {
  componentDidMount() {
    // 获取数据
    this.queryData();
  }

  queryData = () => {
    const {
      extraProps: { url },
      BackEndData,
      fetchBackEndDataloading,
      dispatch,
    } = this.props;
    // 这里会存在多个不同的url请求，所以还不能用公共的fetchBackEndDataloading控制
    if (url && !BackEndData[baseUrl + url]) {
      dispatch({ type: 'global/fetchBackEndData', payload: { url: baseUrl + url } });
    }
  };

  getTreeDataName = (data = [], value) => {
    // console.log(data, value);
    let name = '';
    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      // 后台格式不唯一
      if (element.id == value) {
        name = element.name;
        return name;
      } else if (element.children) {
        name = this.getTreeDataName(element.children, value);
        if (name) {
          return name;
        }
      }
    }
    return name;
  };

  picktreedata = () => {
    const {
      onChange,
      BackEndData,
      extraProps: { type, url, candidates, parentNodeDisable },
    } = this.props;
    let data
    if (type === 1) {
      data = candidates;
    } else {
      data = BackEndData[baseUrl + url];
    }
    const params = {
      data,
      parentNodeSelectable: !parentNodeDisable
    }
    NativeUtil.use(
      'treeDatapicker',
      datastr => {
        const dataObj = JSON.parse(datastr)
        onChange(dataObj.id);
      },
      params
    );
  };

  // 本来这里可以根据nameCode直接显示出来，但是查询的时候如果也根据nameCode查询会查不到数据的，提交的参数应该用id查，
  // select和project查询接口传的值不一样，一个需要id，一个需要name，这样会导致，用nameCode或者controlCode查都不能同时满足这两个
  // 所以统一select不需要nameCode了，显示的时候让组件根据id和数据做显示
  // 但是遇到个问题就是通过接口拿数据时候，接口会调用很多次，需要优化
  render() {
    let data;
    const {
      value,
      placeholder,
      BackEndData,
      disabled,
      readOnly,
      extraProps: { type, url, candidates },
      ...rest
    } = this.props;
    if (type === 1) {
      data = candidates;
    } else {
      data = BackEndData[baseUrl + url];
    }
    let name
    if (data) {
      name = this.getTreeDataName(data, value);
    }
    if (disabled || readOnly) {
      return name ? <Text>{name}</Text> : <Text>{(value && value.toString() || false)}</Text>;
    }
    return (
      <View onClick={this.picktreedata}>
        <TextInput
          value={name}
          placeholder={placeholder}
          readOnly
          // suffix={<SearchOutlined />}
          {...rest}
        />
      </View>
    );
  }
}

export default TreePicker;

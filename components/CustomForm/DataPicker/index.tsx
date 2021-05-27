import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { SearchOutlined } from '@ant-design/icons';
import { Input, Button } from 'antd';
import Layer from '@/components/Layer';
import LayerHeader from '@/components/LayerHeader';
import SearchForm from '@/components/CustomForm/JgSearchForm';
import { flatdata } from '@/models/jgtablemodel';
import getServiceFromFormCode, { FormCodeType } from '@/components/CustomForm/FormCodeService';
import { isProjectMode } from "@/utils/utils"

import TablePicker from './table';

interface IProps extends JgFormProps.IFormProps {
  formdata: any;
  parentformdata: { formCode: string; formdata: any };
  onSelect?: (record: any) => void;
  extraProps: JgFormProps.ExtraProps;
  jgTableModel?: { item: object; editVisible: boolean };
}

interface IStates {
  selectedRows: any[];
  selectedRowKeys: number[];
  visible: boolean;
  tableLoading: boolean;
  data: { list: any[] };
  [index: string]: any;
}
@connect(({ project, account }) => ({
  projectId: project.project.id,
  user: account.user || NativeUtil.use("getUserInfo"),
}))
class Main extends PureComponent<IProps, IStates> {
  service: any;
  state = {
    selectedRows: [],
    selectedRowKeys: [],
    visible: false,
    data: { list: [] },
    havefetched: false,
    tableLoading: false,
    params: {},
  };

  componentDidMount() {
    const { extraProps: { isOperator }, onChange, user, onSelect } = this.props;
    // imgUrl: "测试"
    // name: "小二"
    // position: "https://jgucenter.oss-cn-hangzhou.aliyuncs.com/ucenter/467681936937435136/1604627192947.jpg"
    // tenantId: "467681936937435136"
    // userId: "4144"
    // userName: "小二"
    const newUser = {
      ...user, id: user.userId
    }
    if (isOperator) {
      onSelect(newUser)
      onChange(newUser.userId);
    }
  }

  queryData = async (params?: any, pageRemote = false) => {
    const { projectId, extraProps, parentformdata } = this.props;
    const { formCode, formType } = extraProps;
    const {
      data: { list },
      params: searchParam,
    } = this.state;
    let newParam = params;
    let service;
    // 用户全自定义的service
    if (formType === 'fullCust') {
      // 全自定义的serveice
      service = getServiceFromFormCode(formCode as FormCodeType, 'USERCREATE');
      newParam = { ...params, formCode };
    } else {
      // 系统表单，或者自定义
      service = getServiceFromFormCode(formCode as FormCodeType);
    }
    const paramField = this.getRequestParams();
    this.setState({ tableLoading: true });
    // 如果是项目面板，则所有弹出框查询需要传默认项目，并且项目不可搜索
    const response = await service.list({
      ...searchParam,
      ...newParam,
      ...paramField,
      ...((isProjectMode() && projectId && { projectId }) || {}),
      formCode: parentformdata && parentformdata.formCode,
      approveStatus: 'COMPLETE',
    });
    if (response) {
      const { resp: data } = response;
      const newList = data.list.map(flatdata);
      if (pageRemote) {
        this.setState({ data: { ...data, list: list.concat(newList) }, tableLoading: false, havefetched: true });
      } else {
        this.setState({ data: { ...data, list: newList }, tableLoading: false, havefetched: true });
      }
    }
  };

  searchhandle = (params = {}) => {
    this.setState({ data: { list: [] }, params }, () => {
      this.queryData();
    });
  };
  // 由手写和关联组合
  getRequestParams = () => {
    const {
      extraProps: { combineField, combineMapTo, combineScope, requestParams },
      formdata,
    } = this.props;
    let paramField = {};
    // 先获取关联的查询条件
    if (combineField) {
      if (combineScope === 1) {
        paramField = { [combineMapTo || combineField]: formdata[combineField] };
      } else {
        // 默认mapto一定设置，不然还要判断多种情况
        if (this.hasRelation(combineField)) {
          const value = this.getQueryParam(combineField);
          paramField = { [combineMapTo]: value };
        }
      }
    }
    // 再获取内置的查询条件
    if (requestParams) {
      const paramsArr = requestParams.split('|');
      const defaultParams = paramsArr.reduce((acc, item) => {
        const [key, value] = item.split('=');
        acc[key] = value;
        return acc;
      }, {});
      paramField = { ...defaultParams, ...paramField };
    }

    return paramField;
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  showModal = () => {
    const { readOnly, formdata, id } = this.props;
    const { havefetched } = this.state
    if (!readOnly && !havefetched) {
      this.queryData();
    }
    let selectedRowKeys = [];
    if (formdata && id) {
      const value = formdata[id]
      selectedRowKeys = value ? value.split(",") : []
    }
    this.setState({ visible: true, selectedRowKeys });
  };

  confirm = (recordkeys) => {
    const { onChange, onSelect, extraProps } = this.props;
    const { multiple, codeKey } = extraProps;
    const { data: { list } } = this.state
    const ids = recordkeys.join(',');
    onChange && onChange(ids);
    // 将选择数据回传用于关联
    if (onSelect) {
      const records = recordkeys.map(item =>
        list.find(cur => cur && (cur[codeKey] === item || cur['id'] === item))
      );
      let newData;
      if (multiple) {
        newData = records.map(flatdata);
      } else {
        newData = flatdata(records[0]);
      }
      onSelect(newData);
    }
    NativeUtil.use("popWebHistory");
  };

  checkDisable = () => {
    const {
      extraProps: { combineField, combineScope },
      formdata,
    } = this.props;
    let disable = false,
      combineFieldValue;
    //如果依赖的数据没值，则不能选择 关联数据要先选择才行
    if (combineField) {
      if (combineScope === 1) {
        combineFieldValue = formdata[combineField];
      } else {
        // 作为引用表使用，combineField可能被多个表关联,取目前所在主表依赖的值
        // 并且取值从引用表单拿，而不是表单本身
        // 判断子表是否与主表关联
        if (this.hasRelation(combineField)) {
          combineFieldValue = this.getQueryParam(combineField);
        } else {
          return false;
        }
      }
      disable = !combineFieldValue;
    }
    return disable;
  };

  // 目前只支持单个查询
  getQueryParam = combineField => {
    const { parentformdata } = this.props;
    const depArr = combineField.split('|');
    let value;
    depArr.forEach(item => {
      const [formCode, fieldName] = item.split('.');
      if (formCode === parentformdata.formCode) {
        const formdata = parentformdata.formdata;
        value = formdata[fieldName];
      }
    });
    return value;
  };

  // 判断是否和主表有关联
  hasRelation = combineField => {
    const { parentformdata } = this.props;
    const depArr = combineField.split('|');
    for (let index = 0; index < depArr.length; index++) {
      const item = depArr[index];
      const formCode = item.split('.').shift();
      if (formCode === parentformdata.formCode) {
        return true;
      }
    }

    return false;
  };

  getShowName = () => {
    const {
      id,
      formdata = {},
      extraProps: { nameCode },
    } = this.props;
    // 如果表单数据有值没值则滞空，根据表单的name显示名字
    // 没有传表单数据，说明是子表使用，可以直接显示name
    // 最后根据status值显示
    if (formdata[id]) {
      const newnameCode = nameCode ? nameCode : id.replace('Id', 'Name');
      return formdata[newnameCode];
    }
    return null;
  };

  rowSelectionChange = (selectedRowKeys, selectedRows) => {
    this.setState({ selectedRowKeys });
    this.cacheSeletedData(selectedRows);
  };
  // 把所有选中过的item都缓存起来，最后统一根据selectedRowKeys过滤
  cacheSeletedData = rows => {
    const { selectedRows } = this.state;
    selectedRows.push(...rows);
    this.setState({ selectedRows });
  };

  search(params) {
    const { extraProps } = this.props;
    const { formType } = extraProps;
    let searchParams = {};
    // 用户全自定义的搜索条件和系统自定义搜索条件不一样
    if (formType === 'fullCust') {
      const paramsArr = [];
      Object.keys(params).forEach(key => {
        if (params[key] !== null && typeof params[key] !== 'undefined') {
          paramsArr.push({ [key]: params[key] });
        }
      });
      searchParams.searchParams = JSON.stringify(paramsArr);
    } else {
      searchParams = params;
    }
    this.queryData(searchParams);
  }

  render() {
    const {
      style,
      placeholder,
      extraProps: { multiple, codeKey, combineField, formCode },
      readOnly,
      children: Children,
    } = this.props;
    const { visible, data, tableLoading, selectedRowKeys } = this.state;
    const name = this.getShowName();
    const disable = this.checkDisable();

    const rowSelection: any = {
      hideDefaultSelections: true,
      type: multiple ? 'checkbox' : 'radio',
      onChange: this.rowSelectionChange,
      selectedRowKeys,
    };
    const onRow = multiple
      ? null
      : record => ({
        onDoubleClick: () => {
          this.rowSelectionChange([record[codeKey || 'id']], [record]);
          this.confirm([record[codeKey || 'id']]);
        },
      });
    return (
      <div style={style}>
        {Children ? (
          React.cloneElement(Children, {
            onClick: this.showModal,
            allowClear: true,
            onChange: () => this.props.onChange(null),
            suffix: <SearchOutlined onClick={(e) => { e.stopPropagation(); this.showModal() }} />,
          })
        ) : (
          <Input
            // 如果有combineField值说明有依赖关联，不能让用选择
            disabled={!readOnly && !!disable}
            value={name}
            // 这个readOnly是为了样式显示
            {...!name && { readOnly: true }}
            onClick={readOnly ? () => { } : this.showModal}
            title={name}
            placeholder={placeholder}
            {...!readOnly && { allowClear: true, onChange: () => this.props.onChange(null) }}
            suffix={readOnly ? false : <SearchOutlined onClick={(e) => { e.stopPropagation(); this.showModal() }} />}
          />
        )}
        <Layer
          type="drawer"
          title={
            <LayerHeader
              onClose={() => this.handleCancel()}
              title={placeholder}
            />
          }
          width="100%"
          visible={visible}
          style={{ transform: 'none', overflow: "hidden" }}
        >
          <>
            <div style={{
              padding: "10px 12px",
              backgroundColor: "#f5f5f5"
            }}>
              <SearchForm
                filter={[combineField]}
                loading={tableLoading}
                formCode={formCode}
                reset={() => this.searchhandle()}
                onSearch={params => this.searchhandle(params)}
              />
            </div>
            <TablePicker
              // 在编辑基础数据时候需要用到formCode获取基础表需要的服务
              loading={tableLoading}
              formCode={formCode}
              data={data}
              onRow={onRow}
              rowSelection={rowSelection}
              loadMore={params => this.queryData(params, true)}
            />
            <div className="actionBtns">
              <Button
                onClick={() => this.confirm(selectedRowKeys)}
                type="primary"
              >
                确定
                </Button>
            </div>
          </>
        </Layer>
      </div>
    );
  }
}

export default Main;

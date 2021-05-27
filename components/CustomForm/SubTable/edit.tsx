import React from 'react';
import { message, Button } from 'antd';
import Edit from '@/components/CustomForm/edit/edit';

import Layer from '@/components/Layer';
import LayerHeader from '@/components/LayerHeader';
import styles from '@/components/CustomForm/index.less';
import TableWrapper from "@/components/CustomForm/SubTable/tableWrapper"
import TableList from './tableList';
import tableStyles from "./index.less"

interface SubTableStates {
  data: any;
  visible: boolean;
  // 用来判断是否是编辑
  editIndex: number;
}

class EditableTable extends React.Component<JgFormProps.IFormProps, SubTableStates> {
  state = {
    data: {},
    visible: false,
    editIndex: -1,
  };

  form: any;

  isSum: boolean;

  addRecord = () => {
    const { tableConfig } = this.props;
    const { formCode } = tableConfig;
    if (!formCode) {
      message.warn("请先选择表单类型");
      return
    }
    this.setState({ data: {}, visible: true, editIndex: -1 });
  };

  remove = index => {
    const { value } = this.props;
    value.splice(index, 1);
    this.onChange(value);
  };

  editDetail = index => {
    const { value, form } = this.props;
    // 修改的时候标注index，修改不跟进id判断，直接根据index判断
    form.setFieldsValue(value[index]);
    this.setState({ data: value[index], visible: true, editIndex: index });
  };

  // 单个询价记录修改
  onConfirm = newData => {
    const { value = [], tableConfig = {} } = this.props;
    const { sysVersionId, versionId, formCode } = tableConfig;
    const { editIndex } = this.state;
    if (editIndex === -1) {
      value.push({ ...newData, exts: JSON.stringify({ sysVersionId, versionId, formCode }) });
    } else {
      value.splice(editIndex, 1, { ...newData, exts: JSON.stringify({ sysVersionId, versionId, formCode }) });
    }
    this.onChange(value);
  };

  onChange(value) {
    const { onChange } = this.props;
    onChange(value);
    NativeUtil.use("popWebHistory");
  }

  onCancel = () => {
    const { form } = this.props;
    form.resetFields()
    this.setState({ visible: false });
  };

  validateFields = (fn) => {
    const { form } = this.props;
    form
      .validateFields()
      .then(values => {
        fn(values);
      })
      .catch(err => {
        const { errorFields } = err;
        message.error(errorFields[0].errors.toString());
      });
  }

  render() {
    const { data, visible, editIndex } = this.state;
    const { formdata, parentFormCode, tableConfig, value, form, omitCols } = this.props;
    const { containers, formName, formCode } = tableConfig;
    return (
      <div className={tableStyles.table}>
        <TableWrapper onAddItem={this.addRecord} >
          <div className={tableStyles["table-body"]}>
            <TableList
              value={value}
              containers={containers}
              onEdit={this.editDetail}
              omitCols={omitCols}
            />
          </div>
        </TableWrapper>
        <Layer
          type="drawer"
          title={
            <LayerHeader
              onClose={this.onCancel}
              title={formName}
            />
          }
          visible={visible}
          width="100%"
        >
          <div className={styles.baseForm}>
            <Edit
              containers={containers}
              formCode={formCode}
              formdata={data}
              parentformdata={{ formCode: parentFormCode, formdata }}
              form={form}
            />
            <div className="actionBtns">
              {editIndex !== -1 && <Button onClick={() => { this.remove(editIndex) }}>删除</Button>}
              <Button type="primary" style={{ flex: "2" }} onClick={() => this.validateFields(this.onConfirm)}>保存</Button>
            </div>
          </div>
        </Layer>
      </div>
    );
  }
}

export default EditableTable;

import React, { forwardRef, useEffect } from 'react';
import { Button, Form } from 'antd';
import FormEvent from '@/utils/formevent';
import { DeleteOutlined } from '@ant-design/icons';
import { DataPicker, DataSelecter, JgSelect } from '@/components/CustomForm';

import styles from "./index.less"

const FormItem = Form.Item;

// 这里的ref可能是整个formItem的ref，我们实际上是一个list，可能后面会有问题，目前只是消除提示错误
function RelationList({ value, formCode, onChange, formdata, config }, ref) {
  const newValue = (value && JSON.parse(value)) || [];

  function handler() {
    onChange(null)
  }
  // 不是项目看板下监听表单的projectId来切换审批流程列表
  useEffect(() => {
    FormEvent.on(`${formCode}.projectId`, handler);
    return () => {
      FormEvent.removeListener(`${formCode}.projectId`, handler);
    };
  }, []);
  // 新增
  function addNewItem() {
    newValue.push({ relationId: '', relationModule: '', recordNo: '' });
    onChange(JSON.stringify(newValue));
  }
  // 修改
  function onItemChange(data, index) {
    newValue.splice(index, 1, data);
    onChange(JSON.stringify(newValue));
  }
  // 删除
  function onItemRemove(index) {
    newValue.splice(index, 1);
    onChange(JSON.stringify(newValue));
  }

  const list = newValue.map((item, index) => (
    <RelationItem
      key={index}
      value={item}
      formdata={formdata}
      onChange={data => onItemChange(data, index)}
      remove={() => onItemRemove(index)}
      config={config}
    />
  ));
  return (
    <div ref={ref}>
      <div className="list">{list}</div>
      <Button type="primary" ghost onClick={addNewItem} className="addNewBtn">
        添加
      </Button>
    </div>
  );
}

function RelationItem({ formdata, onChange, value, config, remove }) {
  const { relationId, relationModule } = value;

  function onRelationIdChange(data) {
    onChange({ ...value, recordNo: data.recordNo, relationId: data.id });
  }
  // 模块变了都清除
  function onModuleChange(id) {
    onChange({ recordNo: '', relationId: '', relationModule: id });
  }

  return (
    <DataSelecter extraProps={config} store={window.g_app._store}>
      {candidates => {
        const selectObj = candidates.find(item => item.value === relationModule);
        // console.log(value);
        // console.log(selectObj, relationModule);
        return (
          <div className={styles.relationModule}>
            <div style={{ flex: "1" }}>
              <FormItem label="关联模块" style={{ width: "100%", marginTop: 0 }}>
                <JgSelect
                  placeholder="请选择关联模块"
                  allowClear
                  onChange={onModuleChange}
                  value={relationModule}
                  data={candidates}
                />
              </FormItem>
              {selectObj && (
                <FormItem label={selectObj.itemText} style={{ width: "100%", marginBottom: 0 }}>
                  <DataPicker
                    extraProps={{
                      formCode: selectObj.description,
                      nameCodeKey: 'recordNo',
                      nameCode: 'recordNo',
                      formType: 'system',
                      ...formdata.projectId && { requestParams: `projectId=${formdata.projectId}` },
                    }}
                    formdata={value}
                    value={relationId}
                    placeholder={selectObj.itemText}
                    key={selectObj.description}
                    id="relationId"
                    onChange={() => onRelationIdChange({ recordNo: null, id: null })}
                    onSelect={onRelationIdChange}
                  />
                </FormItem>
              )}
            </div>
            <FormItem className={styles.delBtn}  >
              <span onClick={remove}> <DeleteOutlined style={{ marginRight: 4 }} />删除</span>
            </FormItem>
          </div>
        );
      }}
    </DataSelecter>
  );
}

export default forwardRef(RelationList);

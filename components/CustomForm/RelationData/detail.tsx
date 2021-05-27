import React from 'react';
import FormItemData from '@/components/CustomForm/FormItem/detail';
import { DataSelecter } from '@/components/CustomForm';
import { ConTypes } from '@/components/CustomForm/controlTypes';

function RelationList({ value, config }) {
  const newValue = (value && JSON.parse(value)) || [];

  if (newValue.length === 0) {
    return <p style={{ textAlign: "center" }}>暂无数据</p>
  }

  return (
    <>
      {newValue.map((item, index) => (
        <RelationItem key={index} value={item} config={config} />
      ))}
    </>
  );
}

function RelationItem({ value, config }) {
  const { relationModule } = value;

  return (
    <DataSelecter extraProps={config} store={window.g_app._store}>
      {candidates => {
        const selectObj = candidates.find(item => item.value === relationModule);
        if (!selectObj) {
          return false;
        }
        return (
          <div className="form-info-item">
            <div className="form-info-label">{selectObj.itemText}</div>
            <div className="form-info-value">
              <FormItemData
                data={{
                  controlCode: 'relationId',
                  controlType: ConTypes.DATAPICKER,
                  controlLabel: selectObj.itemText,
                  extraProps: {
                    formCode: selectObj.description,
                    nameCodeKey: 'recordNo',
                    nameCode: 'recordNo',
                    linkable: true,
                  },
                }}
                formdata={value}
              />
            </div>
          </div>
        );
      }}
    </DataSelecter>
  );
}

export default RelationList;

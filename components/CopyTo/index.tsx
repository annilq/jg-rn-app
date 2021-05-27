import React from 'react';
import { Input } from 'antd';

import DataPicker from '@/components/CustomForm/DataPicker';
function CopyTo({ onChange, value, formdata }) {
  const defaultValue = (value && JSON.parse(value)) || [];
  const names = defaultValue.map(item => item.name).join(',');
  const ids = defaultValue.map(item => item.id).join(',');
  function onChangeHandle(data) {
    const newData = data.map(({ name, id }) => ({
      name,
      id,
    }));
    onChange(JSON.stringify(newData));
  }
  return (
    <div style={{ lineHeight: '32px' }}>
      <div>抄送给:</div>
      <DataPicker
        extraProps={{
          formCode: 'User',
          multiple: true,
        }}
        formdata={{ ...formdata, ids }}
        id="ids"
        placeholder="抄送人"
        onSelect={data => onChangeHandle(data)}
        onChange={onChange}
      >
        <Input
          value={names}
          placeholder="抄送人"
          style={{ flex: 1, verticalAlign: 'middle' }}
        />
      </DataPicker>
    </div>

  );
}
export default CopyTo;

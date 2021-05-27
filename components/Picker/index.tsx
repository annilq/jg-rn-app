import React from 'react';
import styles from './index.less';

interface Iprops {
  value: string;
  data: { label: string; value: string }[];
  readOnly?: boolean;
  onChange: (id: string) => void;
}

function Picker(props: Iprops) {
  const { data, value, onChange = () => {}, readOnly } = props;
  const PickerList = data.map(item => (
    <PickerItem
      data={item}
      key={item.value}
      {...!readOnly && { onChange: () => onChange(item.value) }}
      active={item.value === value}
    />
  ));
  return <div className={styles.pickerList}>{PickerList}</div>;
}

function PickerItem(props) {
  const { data = {}, active, onChange = () => {} } = props;
  return (
    <div onClick={onChange} className={active ? 'active picker-item' : 'picker-item'}>
      {data.label}
    </div>
  );
}

export default Picker;

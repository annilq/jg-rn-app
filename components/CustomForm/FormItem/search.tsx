import React from 'react';
import { Input, Switch, Checkbox, InputNumber } from 'antd';
import styles from '@/components/CustomForm/index.less';
import { ConTypes } from '../controlTypes';
import ErrorBoundary from './errorhandle';

import { DataSelecter, TreePicker, JgRangePicker, Address, JgSelect } from '@/components/CustomForm';
import TagPicker from '@/components/CustomForm/TaskTag/tagPicker';

const CheckboxGroup = Checkbox.Group;
// IFormProps
@ErrorBoundary
class FormSearchItem extends React.Component<JgFormProps.FormItemProps> {
  getRenderByType = () => {
    // formProps:{onChange ,value,id}接口数据，用来获取关联值
    const { data, onChange, value, id } = this.props;
    const { extraProps, placeHolder, controlType } = data;
    const formProps = {
      onChange,
      value,
      id,
      placeholder: placeHolder
    };
    let com;
    switch (controlType) {
      case ConTypes.INPUT:
      case ConTypes.TEXTAREA:
      case ConTypes.DATAPICKER:
        com = <Input className={styles.searchInput} placeholder={placeHolder} {...formProps} />;
        break;
      case ConTypes.NUMINPUT:
        com = (
          <InputNumber className={styles.searchInput} placeholder={placeHolder} {...formProps} />
        );
        break;
      case ConTypes.RADIO:
      case ConTypes.SELECT:
        com = (
          <DataSelecter
            extraProps={{
              flag: extraProps.flag,
              type: extraProps.type,
              candidates: extraProps.candidates,
            }}
            store={window.g_app._store}
          >
            {candidates => (
              <JgSelect
                placeholder={placeHolder}
                data={candidates}
                className={styles.searchInput}
                multiple={extraProps.multiple}
                {...formProps}
              />
            )}
          </DataSelecter>
        );
        break;
      case ConTypes.CHECKBOXG:
        com = (
          <DataSelecter
            extraProps={{
              flag: extraProps.flag,
              type: extraProps.type,
              candidates: extraProps.candidates,
            }}
            store={window.g_app._store}
          >
            {candidates => (
              <CheckboxGroup options={candidates} className={styles.searchInput} {...formProps} />
            )}
          </DataSelecter>
        );
        break;
      case ConTypes.ADDRESS:
        com = <Address {...formProps} />;
        break;
      case ConTypes.DATEPICKER:
        com = (
          <JgRangePicker
            className={styles.searchInput}
            extraProps={{ formatId: extraProps.formatId, avoidInit: true }}
            {...formProps}
          />
        );
        break;
      case ConTypes.SWITCH:
        com = (
          <Switch
            className={styles.searchInput}
            checkedChildren="是"
            checked={!!data.value}
            unCheckedChildren="否"
            {...formProps}
          />
        );
        break;
      case ConTypes.TREEPICKER:
        com = (
          <TreePicker
            className={styles.searchInput}
            extraProps={{
              type: extraProps.type,
              url: extraProps.url,
              nameCode: extraProps.nameCode,
              candidates: extraProps.candidates,
            }}
            placeholder={placeHolder}
            disabled={false}
            {...formProps}
          />
        );
        break;
      case ConTypes.TASK:
        com = <TagPicker className={styles.searchInput}  {...formProps} />;
        break;
      default:
        break;
    }
    return com;
  };

  render() {
    // console.log(this.props);

    const Com = this.getRenderByType();
    return <>{Com}</>;
  }
}
export default FormSearchItem;

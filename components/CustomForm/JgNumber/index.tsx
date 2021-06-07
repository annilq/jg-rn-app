import React, { PureComponent } from 'react';
import { Text, View, TextInput } from 'react-native';

import { ValidatorTypes } from '@/components/CustomForm/controlTypes';
import TreePicker from '@/components/CustomForm/TreePicker';

interface NumberProps extends JgFormProps.IFormProps {
  extraProps?: {
    localUnit?: string
    unit: string
    // 默认，百分比，进度条
    formatType: 1 | 2 | 3
    // 固定写死单位，关联单位
    unitType: 1 | 2

  };
  validators?: any;
  placeholder?: string;
}

interface numberAttr {
  min?: number;
  max?: number;
  precision?: number;
}

class JgNumber extends PureComponent<NumberProps> {
  render() {
    const {
      extraProps: { localUnit, unit, formatType = 1, unitType = 2 } = {},
      validators,
      placeholder,
      className,
      value,
      onChange,
      readOnly,
      formdata,
      ...rest
    } = this.props;
    // console.log(formdata[extraProps.unit]);
    // 数字的验证用antd自带的属性控制输入
    const numberValidator =
      validators && validators.find((item) => item.validatorType === ValidatorTypes.NUMBER);
    const numberProps: numberAttr = {};
    if (numberValidator) {
      const { validatorParam } = numberValidator;
      if (validatorParam.minValue || typeof validatorParam.minValue === "number") {
        numberProps.min = parseInt(validatorParam.minValue, 10);
      }
      if (validatorParam.maxValue || typeof validatorParam.maxValue === "number") {
        numberProps.max = parseInt(validatorParam.maxValue, 10);
      }
      if (validatorParam.scale || typeof validatorParam.scale === "number") {
        numberProps.precision = parseInt(validatorParam.scale, 10);
      }
    }
    let com = value
    if (readOnly) {
      switch (formatType) {
        case 1:
          if (typeof numberProps.precision !== "undefined") {
            com = Number((value || 0)).toFixed(numberProps.precision)
          }
          break;
        case 2:
          com = `${Number((com * 100) || 0).toFixed(0)}%`
          break;
        case 3:
          // com = <Progress percent={Number((com * 100) || 0).toFixed(0)} size="small" format={(percent) => percent + "%"} />
          break;
        default:
          break;
      }
    }

    return (
      <View className={className} style={{ display: 'flex' }}>
        {readOnly ? (
          <Text>{com}</Text>
        ) : (
          <TextInput
            value={value}
            {...numberProps}
            placeholder={placeholder}
            style={{ flex: 1 }}
            onChange={onChange}
            {...rest}
          />
        )}{unitType === 2 ? unit && (
          <TreePicker
            extraProps={{
              nameCode: 'unit',
              url: '/api/v1/system/unit/getAllUnit',
              combineType: 2,
            }}
            readOnly
            style={{ marginRight: '10px' }}
            store={window.g_app._store}
            value={formdata[unit]}
          />
        ) : localUnit && <Text style={{ marginLeft: 5 }}>{localUnit}</Text>}
      </View>
    );
  }
}

export default JgNumber;

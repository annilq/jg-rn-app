import React, { PureComponent } from 'react';
import { Cascader } from 'antd';
import addressData from './address';

class Address extends PureComponent<JgFormProps.IFormProps> {
  onChange = record => {
    const { onChange } = this.props;
    const valueStr = record.join(",")
    onChange(valueStr);
  };

  render() {
    const { value = "" } = this.props;
    let valueArr = []
    if (Array.isArray(value)) {
      valueArr = value
    } else {
      valueArr = value && value.split(",") || [];
    }
    return (
      <Cascader options={addressData} value={valueArr} onChange={this.onChange} placeholder="请选择" />
    );
  }
}

export default Address;

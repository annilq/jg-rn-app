import React, { PureComponent } from 'react';
import { Input } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';

interface DateProps extends JgFormProps.IFormProps {
  extraProps?: { formatId: number };
}
class JgRangePicker extends PureComponent<DateProps> {

  getDateFormat = () => 'YYYY-MM-DD';

  pickdate = () => {
    const { onChange } = this.props;
    NativeUtil.use(
      'Datepicker',
      data => {
        onChange(JSON.parse(data));
      },
      "dateRange"
    );
  };

  render() {
    const { className, value, readOnly, ...rest } = this.props;
    if (readOnly && value) {
      return value.join('~');
    }
    return (
      <Input
        suffix={<CalendarOutlined />}
        className={className}
        value={value}
        onClick={this.pickdate}
        {...rest}
        readOnly
      />
    );
  }
}

export default JgRangePicker;

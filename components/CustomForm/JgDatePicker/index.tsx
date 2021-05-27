import React, { useEffect } from 'react';
import { Input } from 'react-native-elements';
// import { CalendarOutlined } from '@ant-design/icons';

interface DateProps extends JgFormProps.IFormProps {
  extraProps?: { formatId: number };
}

function JgDatePicker(props: DateProps) {
  const { value, defaultValue, onChange, extraProps, className, readOnly, ...rest } = props;

  // format
  // 0 :YYYY-MM-DD'
  // 1 :YYYY-MM-DD HH:mm:ss'
  const getDateFormat = () => {
    const formatId = extraProps && extraProps.formatId;
    let dateFormat,
      methedType;
    switch (formatId) {
      case 0:
        dateFormat = 'YYYY-MM-DD';
        methedType = 'date';
        break;
      case 1:
        dateFormat = 'YYYY-MM-DD HH:mm:ss';
        methedType = 'datetime';
        break;
      case 2:
        dateFormat = 'YYYY-wo';
        methedType = "week";
        break;
      case 3:
        dateFormat = 'YYYY-MM';
        methedType = "month";
        break;
      case 4:
        dateFormat = 'YYYY-QQ';
        methedType = "quarter";
        break;
      case 5:
        dateFormat = 'YYYY';
        methedType = "year";
        break;
      default:
        dateFormat = 'YYYY-MM-DD';
        methedType = 'date';
        break;
    }
    return [dateFormat, methedType];
  };

  const [format, type] = getDateFormat();

  const pickdate = () => {

    NativeUtil.use(
      'Datepicker',
      data => {
        onChange(data);
      },
      type
    );
  };

  // useEffect(() => {
  //   if (!value) {
  //     if (defaultValue) {
  //       let initdate
  //       let dateFormat = type;
  //       if (type === "date") {
  //         dateFormat = "day"
  //       }
  //       switch (parseInt(defaultValue, 10)) {
  //         case 1:
  //           initdate = moment().subtract(1, dateFormat)
  //           break;
  //         case 2:
  //           initdate = moment()
  //           break;
  //         case 3:
  //           initdate = moment().add(1, dateFormat)
  //           break;
  //         default:
  //           initdate = moment(defaultValue)
  //           break;
  //       }
  //       onChange(initdate.format(format));
  //     }
  //   }
  // }, []);

  if (readOnly && value) {
    return value;
  }
  return (
    <Input
      suffix={<CalendarOutlined />}
      className={className}
      value={value}
      onClick={pickdate}
      {...rest}
      readOnly
    />
  );
}


export default JgDatePicker;

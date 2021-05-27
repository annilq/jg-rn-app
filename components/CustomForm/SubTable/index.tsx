import React from 'react';
import { connect } from 'react-redux';
import { Form } from 'antd';

import useFormConfig from '@/hooks/useFormConfig';
import useFormCode from '@/hooks/useFormCode';
// import Edit from '@/components/EditRowForm';
import Edit from './edit';

interface IProps extends JgFormProps.IFormProps {
  extraProps: JgFormProps.SubTableExtraProps;
  formdata: any;
  ConstantMap: any;
}

function maptoProps({ global }) {
  return {
    ConstantMap: global.ConstantMap,
  };
}

function SubTableEdit(props: IProps) {
  const {
    iseditmode,
    extraProps,
    observerextraprops,
    ConstantMap,
    formdata,
    value: datavalue,
    onChange,
    dispatch,
    omitCols,
    ...rest
  } = props;
  const [form] = Form.useForm();
  const formCode = useFormCode({
    extraProps,
    configParam: { observerextraprops, formdata, ConstantMap },
  });

  // 如果是新增或者没有详情时候则没有版本号，如果是编辑则有版本号
  const value = datavalue || [];
  const { tableConfig, loading } = useFormConfig(
    formCode,
    value[0] && value[0].exts && JSON.parse(value[0].exts)
  );
  if (!tableConfig) {
    return false;
  }

  function onValueChange(value) {
    onChange([...value]);
  }

  // formdata一定要传下去，不然子表引用不能获取到父级
  return (
    <Edit
      {...rest}
      tableConfig={tableConfig}
      formdata={formdata}
      onChange={onValueChange}
      value={value}
      loading={loading}
      form={form}
      omitCols={omitCols}
    />
  );
}

export default connect(maptoProps)(SubTableEdit);

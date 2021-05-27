import React from 'react';
import { connect } from 'react-redux';

import Detail from '@/components/CustomForm/detail/detail';
import ApproveForm from '@/components/CustomForm/edit/edit';

import useFormConfig from '@/hooks/useFormConfig';

interface IProps {
  // 是否显示审批
  item: any;
  formCode: string;
  [index: string]: any;
}

function DetailPage(props: IProps) {
  const { children, canModifyColumn, item = {}, formCode, approval, form } = props;
  const { sysVersionId, versionId } = item;

  const { tableConfig: config } = useFormConfig(formCode, { sysVersionId, versionId });

  return (
    approval ? (
      <ApproveForm
        formdata={item}
        containers={config.containers}
        approve
        canModifyColumn={canModifyColumn}
        form={form}
        formCode={formCode}
      >
        {/* 如果是审批页面有明细的话直接展示明细 */}
        {children}
      </ApproveForm>
    ) :
      (
        <Detail formdata={item} containers={config.containers} formCode={formCode}>
          {children}
        </Detail>
      )
  );
}

export default connect(({ workflow }) => ({
  canModifyColumn: workflow.canModifyColumn || [],
}))(DetailPage);

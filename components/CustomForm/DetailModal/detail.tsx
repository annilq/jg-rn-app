import React, { useState, useEffect } from 'react';
import getServiceFromFormCode, { FormCodeType } from '@/components/CustomForm/FormCodeService';
import { flatdata } from '@/models/jgtablemodel';
import Detail from '@/components/CustomForm/detail';

interface IProps {
  id: string;
  formConfig: JgFormProps.ControlConfig;
}

function ModalDetail(props: IProps) {
  const { formConfig, id } = props;
  const {
    extraProps: { formCode, formType },
  } = formConfig;
  const [formdata, setFormData] = useState({ sysVersionId: '', versionId: '' });

  useEffect(() => {
    async function getQueryData() {
      if (!formCode) {
        return;
      }
      let serviceObject;
      switch (formType) {
        case 'fullCust':
          serviceObject = getServiceFromFormCode(formCode as FormCodeType, 'USERCREATE');
          break;
        case 'cust':
        case 'system':
          serviceObject = getServiceFromFormCode(formCode as FormCodeType);
          break;
        default:
          serviceObject = getServiceFromFormCode(formCode as FormCodeType);
          break;
      }

      // 根据id在基础表查基础数据，在子表查询拓展数据
      const response = await serviceObject.query({ id });
      if (response && response.resp) {
        // 需要将拓展字段exts格式打平，提升到data中，方便回显表单数据
        const formdata = flatdata(response.resp);
        setFormData(formdata);
      }
    }
    getQueryData();
  }, []);

  return (
    <div className="form-detail-content" style={{ height: "100%", backgroundColor: "#f5f5f5" }}>
      <Detail item={formdata} formCode={formCode} store={window.g_app._store} />
    </div>
  );
}

export default ModalDetail;

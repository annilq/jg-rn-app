import { useState, useEffect } from 'react';
import { getFormConfig } from '@/services/table';

interface IParams {
  sysVersionId?: string;
  versionId?: string;
}

interface nameConfig extends IParams {
  formCode: string;
}
const initState = {
  sysVersionId: '',
  versionId: '',
  containers: [],
};

// 详情以及编辑页面都需要做版本控制，引用表不需要版本控制
// 判断是否需要版本控制,如果需要控制则要watch versionId 变化
// 系统生成的表单自定义的数据可能没有版本号所以不能根据是查询详情来显示版本号
function useFormConfig(formCode, params: IParams = {}) {
  const [config, setConfig] = useState(initState as JgFormProps.FormConfig);
  const [loading, setLoading] = useState(false);
  const { sysVersionId, versionId } = params || {};
  useEffect(() => {
    async function getConfig(configParams: nameConfig) {
      setLoading(true);
      const  formConfig = await getFormConfig(configParams);
      if (formConfig) {
        setConfig(formConfig);
      }
      setLoading(false);
    }
    if (!formCode) {
      return;
    }
    // 是否有版本控制
    if (sysVersionId || versionId) {
      getConfig({ formCode, sysVersionId, versionId });
    } else {
      getConfig({ formCode });
    }
  }, [formCode, sysVersionId, versionId]);

  return { tableConfig: config, loading };
}

export default useFormConfig;

import { useState, useEffect } from 'react';
// 详情以及编辑页面都需要做版本控制，引用表不需要版本控制
// 判断是否需要版本控制,如果需要控制则要watch versionId 变化
function useFormCode({ extraProps, configParam: { observerextraprops, formdata, ConstantMap } }) {
  const { referenceField, referenceMapTo, referenceType, formCode: defaultFormCode } = extraProps;
  //   来自关联的 referenceField
  const oberserValue = formdata && formdata[referenceField];
  const [formCode, setFormCode] = useState(null);
  // 如果是关联的则根据值来
  useEffect(
    () => {
      if (referenceType === 1) {
        //   读取formCode
        setFormCode(defaultFormCode);
      } else if (referenceType === 2) {
        const { flag } = observerextraprops;
        const flagdictList = ConstantMap[flag];
        if (flagdictList && oberserValue) {
          // console.log(ConstantMap[flag]);
          const dict = flagdictList.find(item => item.key === oberserValue);
          const formCode = dict[referenceMapTo] || dict[referenceField];
          if (formCode) {
            setFormCode(formCode);
          }
        }
      }
    },
    [defaultFormCode, oberserValue]
  );

  return formCode;
}
export default useFormCode;

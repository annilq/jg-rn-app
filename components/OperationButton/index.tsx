import React from 'react';

// 每个流程默认会有发起，导出，打印，导入，设置按钮
type OperationType = 'WRITE' | 'DOWNLOAD' | 'PRINT' | 'EDIT' | 'DELETE'| 'IMPORT';
interface Iprops {
  operationType: OperationType;
  operations: OperationType[];
  children: React.ReactElement;
}
function OperationButton({
  operations = [],
  children,
  operationType,
}: Iprops) {
  // 根据当前按钮type来判断是否有权限
  if (!operations.includes(operationType)) {
    return false;
  }
  return <>{children}</>;
}

export default OperationButton;

import React, { useEffect } from 'react';
import router from 'umi/router';
import { LeftOutlined } from '@ant-design/icons';
// 用这个组件来记录页面跳转了几次
function LayerHeader(props) {
  const { onClose = () => router.goBack(), children, data = {}, title, rightButton = false } = props;
  useEffect(() => {
    onClose && NativeUtil.pushWebHistory(onClose);
    return () => { };
  }, []);
  return (
    <div style={{ textAlign: 'center', position: 'relative', display: "none" }}>
      {children}
      <div onClick={NativeUtil.popWebHistory.bind(NativeUtil)} style={{ position: 'absolute' }}>
        <LeftOutlined />
      </div>
      <div style={{ flex: '1' }}>{title || data.name || '详情'}</div>
      {rightButton && (
        <div style={{ position: 'absolute', right: '0', top: '0' }}>{rightButton}</div>
      )}
    </div>
  );
}
export default LayerHeader;

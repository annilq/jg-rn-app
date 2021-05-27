import { useState, useEffect } from 'react';

function useLayer(initVisible = false) {
  const [visible, setVisible] = useState(initVisible);
  // layer显示控制逻辑
  const setVisibleWrapper = function (value: boolean) {
    if (value) {
      // NativeUtil.pushWebHistory(() => setVisible(false));
      setVisible(value)
    } else {
      // NativeUtil.use("popWebHistory");
      setVisible(value)
    }
  }

  useEffect(() => {
    if (initVisible) {
      // NativeUtil.pushWebHistory(() => setVisible(false));
      setVisible(true);
    }
    return () => {
      if (initVisible) {
        // NativeUtil.use("popWebHistory")
        setVisible(false);
      }
    };
  }, []);

  return [visible, setVisibleWrapper] as const;
}
export default useLayer;

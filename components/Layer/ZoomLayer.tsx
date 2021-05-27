import React, { useEffect, useRef } from 'react';

import { ArrowsAltOutlined, ShrinkOutlined } from '@ant-design/icons';

import useFullScreen from '@/hooks/useFullScreen';

function ZoomPage({ selector }) {
  const drawerRef = useRef(null);
  const [isFullScreen, setFullScreen] = useFullScreen(drawerRef);
  useEffect(
    () => {
      if (drawerRef.current) {
        if (isFullScreen) {
          drawerRef.current.style.width = '100vw';
        } else {
          drawerRef.current.style.width = drawerRef.current.originWidth;
        }
      }
    },
    [isFullScreen]
  );

  useEffect(
    () => {
      drawerRef.current = document.querySelector(selector);
      drawerRef.current.originWidth = drawerRef.current.style.width;
    },
    []
  );

  return <div onClick={() => setFullScreen(!isFullScreen)}>{isFullScreen ? <><ShrinkOutlined />退出</> : <><ArrowsAltOutlined />全屏</>}</div>;
}
export default ZoomPage;

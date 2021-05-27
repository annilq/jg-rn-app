import { useState, useEffect } from 'react';
// 要配合屏幕转动
// 1 当屏幕没有转动时候设置页面样式强行旋转页面
// 2 屏幕转动时候适配一下就可以，不用多修改
function useOrientationChange() {
  // 1竖屏
  // 2横屏
  // 默认竖屏
  const [isLandscape, setLandscape] = useState(false);

  // function orientationChange() {
  //   console.log(window.orientation);
  //   switch (window.orientation) {
  //     case 0:
  //       console.log("肖像模式 0,screen-width: " + screen.width + "; screen-height:" + screen.height);
  //       setLandscape(false);
  //       break;
  //     case -90:
  //       console.log("左旋 -90,screen-width: " + screen.width + "; screen-height:" + screen.height);
  //       setLandscape(true);
  //       break;
  //     case 90:
  //       console.log("右旋 90,screen-width: " + screen.width + "; screen-height:" + screen.height);
  //       setLandscape(true);
  //       break;
  //     case 180:
  //       console.log("风景模式 180,screen-width: " + screen.width + "; screen-height:" + screen.height);
  //       setLandscape(false);
  //       break;
  //   };
  // }


  // useEffect(() => {
  //   orientationChange()
  //   window.addEventListener('orientationchange', orientationChange);
  //   return () => {
  //     window.removeEventListener('orientationchange', orientationChange);
  //   };
  // }, []);

  useEffect(() => {
    return () => {
      // 退出时候设置竖屏
      NativeUtil.use("setScreenOrientation", null, {
        type: 1
      })
    };
  }, []);

  const setLandscapeWrapper = function (value) {
    // 设置横屏
    NativeUtil.use("setScreenOrientation", function () {
      setLandscape(!isLandscape);
    }, {
      type: value ? 2 : 1
    })
  }

  return [isLandscape, setLandscapeWrapper];
}
export default useOrientationChange;

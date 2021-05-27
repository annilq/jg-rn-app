import { useState } from 'react';
import { useNativeEffect } from 'remax';
import CommonDetail from '@/components/CustomForm/detail/combine';
import DetailActions from '@/components/LayerHeader/detailActions';
import IndexItemCell from '@/components/TableItem/IndexItem';

export function useDetailCom(componentPath) {
  const [component, setComponent] = useState({ component: null });
  useNativeEffect(
    () => {
      function getComponent() {
        // https://github.com/webpack/webpack/issues/6680
        // referance:https://reactjs.org/docs/code-splitting.html
        // https://webpack.js.org/api/module-methods#magic-comments
        if (componentPath) {
          import(`@/pages/${componentPath}/Detail/index.js`)
            .then(({ default: Detail }) => {
              setComponent({ component: Detail });
            })
            .catch((e) => {
              // console.log(e);
              setComponent({ component: CommonDetail });
            });
        } else {
          setComponent({ component: CommonDetail });
        }
      }
      getComponent();
    },
    [componentPath]
  );

  return component;
}

export function useHeaderBar(componentPath) {
  const [headerBar, setComponent] = useState({ headerBar: DetailActions });
  useNativeEffect(
    () => {
      function getComponent() {
        // https://github.com/webpack/webpack/issues/6680
        // referance:https://reactjs.org/docs/code-splitting.html
        // https://webpack.js.org/api/module-methods#magic-comments
        if (componentPath) {
          import(`@/pages/${componentPath}/HeaderBar/index.tsx`)
            .then(({ default: HeaderBar }) => {
              setComponent({ headerBar: HeaderBar });
            })
            .catch((e) => {
              // console.log(e);
              setComponent({ headerBar: DetailActions });
            });
        }
        
      }
      getComponent();
    },
    [componentPath]
  );

  return headerBar;
}

export function useEditCom(componentPath) {
  const [component, setComponent] = useState({ component: null });
  useNativeEffect(
    () => {
      function getComponent() {
        // https://github.com/webpack/webpack/issues/6680
        // referance:https://reactjs.org/docs/code-splitting.html
        // https://webpack.js.org/api/module-methods#magic-comments
        if (componentPath) {
          import(`@/pages/${componentPath}/Edit/index.js`)
            .then(({ default: Edit }) => {
              setComponent({ component: Edit });
            })
            .catch((e) => {
              // console.log(e);
              // setComponent({ headerBar: LayerHeader });
            });
        }
      }
      getComponent();
    },
    [componentPath]
  );

  return component;
}
// 获取自定义的List追加到表格后面
export function useListCol(componentPath) {
  const [headerBar, setComponent] = useState({ ListCol: [] });
  useNativeEffect(
    () => {
      function getComponent() {
        if (componentPath) {
          import(`@/pages/${componentPath}/List/index.tsx`)
            .then(({ default: cols }) => {
              setComponent({ ListCol: cols });
            })
            .catch((e) => {
              // console.log(e);
            });
        }
      }
      getComponent();
    },
    [componentPath]
  );

  return headerBar;
}

// 移动端列表项目render
export function useListItem(componentPath) {
  const [ListItem, setComponent] = useState({ ListItem: IndexItemCell });
  useNativeEffect(
    () => {
      function getComponent() {
        if (componentPath) {
          import(`@/pages/${componentPath}/ListItem/index.tsx`)
            .then(({ default: cols }) => {
              setComponent({ ListItem: cols });
            })
            .catch((e) => {
              // console.log(e);
            });
        }
      }
      getComponent();
    },
    [componentPath]
  );

  return ListItem;
}

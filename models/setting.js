import { message } from 'antd';
import { debounce } from 'lodash';
import defaultSettings from '../../config/defaultSettings';

let lessNodesAppended;
const updateTheme = debounce(primaryColor => {
  // // Don't compile less in production!
  // if (APP_TYPE !== 'site') {
  //   return;
  // }
  // Determine if the component is remounted
  if (!primaryColor) {
    return;
  }
  const hideMessage = message.loading('正在编译主题！', 0);
  function buildIt() {
    if (!window.less) {
      return;
    }
    setTimeout(() => {
      window.less
        .modifyVars({
          '@primary-color': primaryColor,
        })
        .then(() => {
          hideMessage();
        })
        .catch(e => {
          console.error(`编译失败:${JSON.stringify(e)}`);
          message.error('Failed to update theme');
          hideMessage();
        });
    }, 200);
  }
  if (!lessNodesAppended) {
    // insert less.js and color.less
    const lessStyleNode = document.createElement('link');
    const lessConfigNode = document.createElement('script');
    const lessScriptNode = document.createElement('script');
    lessStyleNode.setAttribute('rel', 'stylesheet/less');
    lessStyleNode.setAttribute('href', '/color.less');
    lessConfigNode.innerHTML = `
      window.less = {
        async: true,
        env: 'production',
        javascriptEnabled: true
      };
    `;
    lessScriptNode.src = 'https://gw.alipayobjects.com/os/lib/less.js/3.8.1/less.min.js';
    lessScriptNode.async = true;
    lessScriptNode.onload = () => {
      buildIt();
      lessScriptNode.onload = null;
    };
    document.body.appendChild(lessStyleNode);
    document.body.appendChild(lessConfigNode);
    document.body.appendChild(lessScriptNode);
    lessNodesAppended = true;
  } else {
    buildIt();
  }
},300);

const updateColorWeak = colorWeak => {
  document.body.className = colorWeak ? 'colorWeak' : '';
};

export default {
  namespace: 'setting',
  state: defaultSettings,
  reducers: {
    getSetting(state) {
      // 获取本地配置
      const setting = JSON.parse(localStorage.getItem('app-setting')) || {};
      const { primaryColor, colorWeak } = setting;
      if (primaryColor && state.primaryColor !== primaryColor) {
        updateTheme(primaryColor);
      }
      updateColorWeak(colorWeak);
      return {
        ...state,
        ...setting,
      };
    },
    changeSetting(state, { payload }) {
      const { primaryColor, colorWeak, contentWidth } = payload;
      if (primaryColor && state.primaryColor !== primaryColor) {
        updateTheme(primaryColor);
      }
      if (state.contentWidth !== contentWidth && window.dispatchEvent) {
        window.dispatchEvent(new Event('resize'));
      }
      updateColorWeak(colorWeak);

      const result = { ...state, ...payload };

      // 保存配置到本地
      localStorage.setItem('app-setting', JSON.stringify(result));

      return result;
    },
  },
};

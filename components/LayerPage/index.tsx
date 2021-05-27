import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';

import Layer from '@/components/Layer';
import LayerHeader from '@/components/LayerHeader';

const history = createBrowserHistory();

class LayerPage {
  state = { containers: [] };

  static LayerPageMap = {};

  constructor() {
    history.listen(() => {
      LayerPage.destroyAll();
    });
  }

  static destroyAll = () => {
    Object.keys(LayerPage.LayerPageMap).forEach(id => LayerPage.close(id));
  };

  static close = id => {
    ReactDOM.unmountComponentAtNode(LayerPage.LayerPageMap[id]);
    document.body.removeChild(LayerPage.LayerPageMap[id]);
    delete LayerPage.LayerPageMap[id];
  };

  showPage = content => {
    const uid = `layer-${Date.now()}`;
    const containerEl = document.createElement('div');
    containerEl.id = uid;
    LayerPage.LayerPageMap[uid] = containerEl;
    document.body.appendChild(LayerPage.LayerPageMap[uid]);
    ReactDOM.render(
      <Provider store={window.g_app._store}>
        <Layer
          type="drawer"
          title={<LayerHeader onClose={() => LayerPage.close(uid)} />}
          width="100%"
          visible
          getContainer={false}
        >
          {content}
        </Layer>
      </Provider>,
      LayerPage.LayerPageMap[uid]
    );
    return () => LayerPage.close(uid);
  };
}

export default new LayerPage();

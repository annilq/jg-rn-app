import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Tag } from 'antd';
import dagre from 'dagre';
import G6 from '@/components/FlowChart/g6';
import FlowConfig from '@/components/FlowChart/flowConfig';
import { formatFlow } from '@/utils/utils';
import styles from './index.less';

function FlowPage(props) {
  const { dispatch, instanceId } = props;
  let graph;
  let g;
  const ref = React.useRef(null);

  function initDrawFlow(data) {
    g = new dagre.graphlib.Graph({ directed: true, compound: true, multigraph: true });
    g.setDefaultEdgeLabel(() => ({}));
    const rect = ref.current.getBoundingClientRect();
    g.setGraph({ rankdir: 'TB' });
    G6.registerEdge(
      'mPolyline',
      {
        draw(cfg, group) {
          const startPoint = cfg.startPoint;
          const endPoint = cfg.endPoint;
          const shape = group.addShape('path', {
            attrs: {
              endArrow: {
                path: 'M 6,0 L -1,-6 L -1,6 Z',
                d: 6,
              },
              stroke: 'rgb(176,176,176)',
              lineWidth: 1,
              path: [['M', startPoint.x, startPoint.y], ['L', endPoint.x, endPoint.y]],
            },
          });
          return shape;
        },
        afterDraw(cfg, group) {
          return false;
        }
      },
      'quadratic'
    );
    G6.registerEdge(
      'ePolyline',
      {
        draw(cfg, group) {
          const startPoint = cfg.startPoint;
          const endPoint = cfg.endPoint;
          const shape = group.addShape('path', {
            attrs: {
              endArrow: {
                path: 'M -4, 0 m -4, 0 a4,4 0 1,0 8,0 a4,4 0 1,0 -8,0 z',
              },
              stroke: 'rgb(176,176,176)',
              lineWidth: 1,
              path: [['M', startPoint.x, startPoint.y], ['L', endPoint.x, endPoint.y]],
            },
          });
          return shape;
        },
        afterDraw(cfg, group) {
          return false;
        }
      },
      'quadratic'
    );
    graph = new G6.Graph({
      ...FlowConfig,
      container: ref.current,
      width: rect.width,
      height: rect.height,
    });
    graph.data(data);
    graph.render();
  }

  useEffect(
    () => {
      if (instanceId) {
        dispatch({
          type: 'workflow/queryWorkFlow',
          payload: { instanceId },
          callback: flowdata => {
            const newData = formatFlow(flowdata.nodeList, flowdata.linkList, flowdata.tasks);
            initDrawFlow(newData);
          },
        });
      }
      return () => {
        if (graph) {
          graph.destroy();
        }
      };
    },
    [instanceId]
  );

  const color = ['#FFFFFF', '#1890FF', '#FF9A18', '#E0E0E0'];
  return (
    <div style={{ display: 'flex', flexDirection: "column", height: "100%",backgroundColor:"#f0f2f5" }}>
      <div style={{ alignItems: "center", display: "flex", justifyContent: "center", height: 35, backgroundColor: "#fff" }}>
        <span>
          <Tag
            color={color[0]}
            className={styles.colorBlock}
            style={{ margin: "2px 5px 5px 10px", border: '1px solid #1890FF' }}
          />
          已处理
        </span>
        <span>
          <Tag
            color={color[1]}
            className={styles.colorBlock}
            style={{ margin: "2px 5px 5px 10px", border: '1px solid #235685' }}
          />
          进行中
        </span>
        <span>
          <Tag
            color={color[2]}
            className={styles.colorBlock}
            style={{ margin: "2px 5px 5px 10px", border: '1px solid #D48116' }}
          />
          有异常
        </span>
        <span>
          <Tag color={color[3]} className={styles.colorBlock} style={{ margin: "2px 5px 5px 10px" }} />
          未开始
        </span>
      </div>

      <div ref={ref} style={{ flex: 1 }} />
    </div>
  );
}

export default connect(({ workflow }) => ({
  workflow,
}))(FlowPage);

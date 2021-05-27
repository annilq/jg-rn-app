import React, { useEffect } from 'react';
import dagre from 'dagre';
import G6 from '@/components/FlowChart/g6';
import FlowConfig from '@/components/FlowChart/flowConfig';
import { defineEditor } from '@/utils/utils';

function FlowPage(props) {
  let graph;
  let g;
  const { flowData } = props;
  const ref = React.useRef(null);

  function initDrawFlow(data) {
    g = new dagre.graphlib.Graph({ directed: true, compound: true, multigraph: true });
    g.setDefaultEdgeLabel(() => { });
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
      height: 500,
    });
    graph.data(data);
    graph.render();
  }

  function getData() {
    const newData = defineEditor(flowData.nodeList, flowData.linkList);
    initDrawFlow(newData);
  }

  useEffect(
    () => {
      if (flowData) {
        getData();
      }
      return () => {
        if (graph) {
          graph.destroy();
        }
      };
    },
    [flowData]
  );

  return <div ref={ref} />;
}
export default FlowPage;

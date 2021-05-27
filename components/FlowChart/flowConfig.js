export default {
  pixelRatio: 2,
  fitView: true,
  minZoom: 1,
  maxZoom: 1,
  rollback: true,
  layout: {
    type: 'dagre',
    ranksep: 25,
    controlPoints: true,
  },
  modes: {
    default: ['click-select', 'wheel-canvas', 'drag-canvas']
  },
};

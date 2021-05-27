import G6 from '@antv/g6';

G6.registerNode(
  'START',
  {
    drawShape(cfg, group) {
      const { size } = cfg;
      const rect = group.addShape('rect', {
        attrs: {
          x: -size[0] / 2,
          y: -size[1] / 2,
          width: size[0],
          height: size[1],
          radius: 4,
          stroke: 'rgb(255,194,116)',
          fill: 'rgba(254,228,211,0.92)',
        },
      });
      return rect;
    },
  },
  'single-shape'
);
G6.registerNode(
  'END',
  {
    drawShape(cfg, group) {
      const { size } = cfg;
      const circle = group.addShape('rect', {
        attrs: {
          x: -size[0] / 2,
          y: -size[1] / 2,
          width: size[0],
          height: size[1],
          radius: 4,
          fill: 'rgba(255,255,255,0)',
        },
      });
      return circle;
    },
  },
  'single-shape'
);
G6.registerNode(
  'USERTASK',
  {
    drawShape(cfg, group) {
      const { size } = cfg;
      const rect = group.addShape('rect', {
        attrs: {
          x: -size[0] / 2,
          y: -size[1] / 2,
          width: size[0],
          height: size[1],
          radius: 4,
          stroke: 'rgb(148,204,255)',
          fill: 'rgba(202,230,255,0.92)',
        },
      });
      return rect;
    },
  },
  'single-shape'
);

G6.registerNode(
  'DECISION',
  {
    drawShape(cfg, group) {
      const rect = group.addShape('rect', {
        attrs: {
          x: -40,
          y: -24,
          width: 80,
          height: 48,
          radius: 24,
          stroke: 'rgb(92,219,211)',
          fill: 'rgba(230,255,251,0.92)',
        },
      });
      return rect;
    },
  },
  'single-shape'
);
G6.registerNode(
  'USERDECISION',
  {
    drawShape(cfg, group) {
      const rect = group.addShape('rect', {
        attrs: {
          x: -40,
          y: -24,
          width: 80,
          height: 48,
          radius: 5,
          stroke: 'rgb(92,219,211)',
          fill: 'rgba(230,255,251,0.92)',
        },
      });
      return rect;
    },
  },
  'single-shape'
);

G6.registerNode(
  'FINISH',
  {
    drawShape(cfg, group) {
      const { size } = cfg;
      const rect = group.addShape('rect', {
        attrs: {
          x: -size[0] / 2,
          y: -size[1] / 2,
          width: size[0],
          height: size[1],
          radius: 4,
          stroke: '#1890FF',
          fill: '#FFFFFF',
        },
      });
      return rect;
    },
  },
  'single-shape'
);
G6.registerNode(
  'END',
  {
    drawShape(cfg, group) {
      const { size } = cfg;
      const circle = group.addShape('rect', {
        attrs: {
          x: -size[0] / 2,
          y: -size[1] / 2,
          width: size[0],
          height: size[1],
          radius: 4,
          fill: 'rgba(255,255,255,0)',
        },
      });
      return circle;
    },
  },
  'single-shape'
);
G6.registerNode(
  'CURRENT',
  {
    drawShape(cfg, group) {
      const { size } = cfg;
      const rect = group.addShape('rect', {
        attrs: {
          x: -size[0] / 2,
          y: -size[1] / 2,
          width: size[0],
          height: size[1],
          radius: 4,
          stroke: '#235685',
          fill: '#1890FF',
        },
      });
      return rect;
    },
  },
  'single-shape'
);
G6.registerNode(
  'WARNING',
  {
    drawShape(cfg, group) {
      const { size } = cfg;
      const rect = group.addShape('rect', {
        attrs: {
          x: -size[0] / 2,
          y: -size[1] / 2,
          width: size[0],
          height: size[1],
          radius: 4,
          stroke: '#D48116',
          fill: '#FF9A18',
        },
      });
      return rect;
    },
  },
  'single-shape'
);
G6.registerNode(
  'UNFINISH',
  {
    drawShape(cfg, group) {
      const { size } = cfg;
      const rect = group.addShape('rect', {
        attrs: {
          x: -size[0] / 2,
          y: -size[1] / 2,
          width: size[0],
          height: size[1],
          radius: 4,
          stroke: '#E0E0E0',
          fill: '#E0E0E0',
        },
      });
      return rect;
    },
  },
  'single-shape'
);
G6.registerBehavior('wheel-canvas', {
  getDefaultCfg() {
    return {
      position: { clientX: 0, clientY: 0 },
    };
  },
  getEvents() {
    return {
      touchmove: 'onTouchMove',
      touchstart: 'onTouchStart',
    };
  },

  onTouchStart(e) {
    e.preventDefault();
    if (!this.shouldUpdate.call(this, e)) {
      return;
    }
    const { x, y } = e
    this.set('position', { x, y })
  },

  onTouchMove(e) {
    // e.preventDefault();
    // if (!this.shouldUpdate.call(this, e)) {
    //   return;
    // }
    const { x, y } = e

    const { x: originalX, y: originalY } = this.get('position')

    const { graph } = this;
    // console.log(`originalX:${originalX},clientX:${clientX}` );
    // console.log(originalX - clientX, originalY - clientY);
    // console.log(originalX - clientX, originalY - clientY);
    // console.log(originalX - clientX, originalY - clientY);

    graph.translate((x - originalX), (y - originalY));
    // graph.paint();
    // graph.emit('wheelzoom', e);
  },
});
G6.Global.nodeStateStyle.selected = {
  fill: 'rgba(24,144,255,0.6)',
};

export default G6;

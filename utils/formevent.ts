import EventEmitter from 'wolfy87-eventemitter';

class FormEvent extends EventEmitter {
  private eventMap = {};

  clear = formCode => {
    this.eventMap = { [formCode]: {} };
    this.removeAllListeners(new RegExp(formCode));
  };

  emitdata = (formCode, channel, data) => {
    const channelName = `${formCode}.${channel}`;
    this.emit(channelName, data);
  };

  listen = (formCode, channels, controlCode, handler) => {
    if (this.hasListened(formCode, controlCode)) {
      return;
    }
    this.eventMap[formCode][controlCode] = true;
    channels.split('|').forEach(channel => {
      // 默认的命名空间是本表单的formCode
      // 跨表单关联则需要提供命名空间
      const channelSpace = channel.split('.');
      if (channelSpace.length == 1) {
        channelSpace.unshift(formCode);
      }
      const channelName = channelSpace.join('.');
      console.log(`listen ${channelName} for ${controlCode}`);
      this.on(channelName, handler);
    });
  };

  private hasListened = (formCode, controlCode) => {
    this.eventMap[formCode] = this.eventMap[formCode] || {};
    return this.eventMap[formCode][controlCode];
  };
}

// class TestEvent extends EventEmitter {
//   formCode: any;
//   addformListener = formCode => {};
// }

// class EventDemo extends EventEmitter {
//   static EventManger = new TestEvent();
//   constructor(formCode) {
//     super();
//     EventDemo.EventManger.addformListener(formCode);
//   }
// }

// const a = new EventDemo('a');
// const b = new EventDemo('b');
// a.on('change', function(data) {
//   console.log(data);
// });
// b.emit('change', 'annilq');

// 暴露一个全局event 事件管理器
export default new FormEvent();

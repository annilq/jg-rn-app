// 验证器controlTypes
const ValidatorTypes = {
  ISREQUIRED: 1, //必填
  INPUTLENGTH: 2, //输入框长度
  NUMBER: 3, //数字
  DATE: 4, //时间
  DATERANGE: 5, //时间区间
};
// 组件controlTypes
const ConTypes = {
  CONTAINER: 0, //单行文本
  INPUT: 1, //单行文本
  TEXTAREA: 2, //多行文本
  NUMINPUT: 3, //数字选择
  RADIO: 4, //单选框
  CHECKBOXG: 5, //多选框
  SELECT: 6, //下拉框
  DATEPICKER: 7, //时间选择
  DATERANGE: 8, //时间选择
  SWITCH: 9, //开关
  DATAPICKER: 21, //可关联模块用于选择查看
  TREEPICKER: 22, //树形选择器
  FILEUPLOADER: 23, // 附件上传
  IMAGEUPLOADER: 24, // 图片上传
  ADDRESS: 25, // 地址信息
  LOCATION: 26, // 定位信息
  INVOICE: 27, // 发票上传回显信息
  SUBTABLE: 28, // 子表
  RelationData: 29, // 关联模块
  TASK: 30, // 任务标签
};
export { ValidatorTypes, ConTypes };

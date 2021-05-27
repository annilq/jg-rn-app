/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

// Form包装过的组建类型检查问题
// https://github.com/ant-design/ant-design/issues/11259

declare namespace JgFormProps {
  interface ExtraProps {
    nameCode?: string;
    formCode?: string;
    formatId?: number;
    flag?: string;
    type?: number;
    candidates?: [];
    formType?: 'fullCust' | 'cust' | 'system';
    multiple?: boolean;
    // 是否只读
    readOnly?: boolean;
    // 显示字段获取值
    nameCodeKey?: string;
    // 从数据表中获取值
    codeKey?: string;
    combineField?: string;
    combineMapTo?: string;
    // 本表关联，跨表关联
    combineScope?: 1 | 2;
    // 用户手写的查询字符串
    requestParams?: string;
    [index: string]: any;
  }

  // 表单配置props
  interface ControlConfig {
    extraProps: ExtraProps;
    validators?: { validatorParam: { [index: string]: any }; validatorType: number }[];
    controlLabel: string;
    controlType: number;
    controlCode: string;
    [index: string]: any;
  }

  // 表单配置接口返回
  interface FormConfig {
    containers: ControlConfig[];
    sysVersionId: string;
    versionId: string;
    formName: string;
    approvable: boolean;
    formType: 'fullCust' | 'cust' | 'system';
  }

  // form props
  interface IFormProps {
    onChange: (value) => void;
    value?: any;
    id?: string;
    [index: string]: any;
  }

  // 表单项目属性
  interface FormItemProps extends IFormProps {
    // 表单配置数据
    data: ControlConfig;
    form?: any;
  }

  // 子表单
  interface SubTableExtraProps {
    // 根据type判断是引用还是读取formCode
    referenceType: 1 | 2;
    //  如果有formCode最好，可以直接拿来渲染子表单页面
    formCode?: string;
    // 1. 需要在表单配置中找到referenceField的控件里面拓展字段的对应的flag
    // 2. 再根据flag以及当前referenceField的值获取到数据字典中对应的formCode
    referenceField?: string;
    // 如果有referenceMapTo值，formCode的取值为数据里面的referenceMapTo字段(字典类型数据为description)
    // 没有的话就默认取数据里面的formCode字段
    referenceMapTo?: string;
    // 基本是等于数据字典里面的description字段
    flag?: string;
  }
}

declare interface JGListData {
  list: any[];
  currentPage?: number,
  pageSize?: number,
  totalSize?: number,
}
import { ValidatorTypes } from '@/components/CustomForm/controlTypes';
/**
 * @argument 需要支持的验证validators
 * @description  将表单的验证信息与ant design中表单的验证字段相匹配
 */
export const getValidator = (controlConfig: JgFormProps.ControlConfig) => {
  const { controlLabel, validators } = controlConfig;
  const rules = [];
  if (validators) {
    validators.forEach(validator => {
      const rule: {
        required?: boolean;
        message?: string;
        [index: string]: any;
      } = {};
      // 如果该验证已经定义
      const validatorData = validator.validatorParam;
      // 待验证数据
      switch (validator.validatorType) {
        case ValidatorTypes.ISREQUIRED:
          if (validatorData.require) {
            rule.required = true;
            rule.message = `${controlLabel}为必填项`;
          }
          break;
        case ValidatorTypes.INPUTLENGTH:
          if (validatorData.maxLength) {
            rule.max = parseInt(validatorData.maxLength, 10);
            rule.message = `${controlLabel}长度不能超过${validatorData.maxLength}`;
          } else if (validatorData.minLength) {
            rule.min = parseInt(validatorData.minLength, 10);
            rule.message = `${controlLabel}长度不能少于${validatorData.minLength}`;
          }
          if (validatorData.maxLength && validatorData.minLength) {
            rule.message = `${controlLabel}长度应该在${validatorData.minLength}和${validatorData.maxLength
              }个字符之间`;
          }
          break;
        case ValidatorTypes.NUMBER:
        case ValidatorTypes.DATE:
        case ValidatorTypes.DATERANGE:
          break;
        default:
      }
      if (Object.keys(rule).length > 0) {
        rules.push(rule);
      }
    });
  }

  return rules;
};

export const getColumnsFromContainersByFliter = function getColumnsFromContainersByFliter(containers: JgFormProps.ControlConfig[] = [], filter = item => item.isdisplayInList): JgFormProps.ControlConfig[] {
  const columnsData = containers.reduce(
    (acc, container) => acc.concat(container.controls.filter(filter)),
    []
  );
  return columnsData;
};


// 子表合计功能
interface Data {
  [index: string]: any
}

type controlCode = string

export const getSumRows = function (controls: JgFormProps.ControlConfig[]) {
  const sumRows = [];
  controls.forEach(item => {
    const {
      extraProps: { sum },
    } = item;
    if (sum) {
      sumRows.push(item.controlCode);
    }
  });
  return sumRows;
};

export const getSumRowsRender = function (controls: JgFormProps.ControlConfig[]) {
  const sumRows = [];
  controls.forEach(item => {
    const {
      extraProps: { sum },
    } = item;
    if (sum) {
      sumRows.push({ dataIndex: item.controlCode, title: item.controlLabel });
    }
  });
  return sumRows;
};


export const getSumData = function (value: Data[], controls: JgFormProps.ControlConfig[], sumcontrols: controlCode[]) {
  const firstCol = controls[0];
  if (!firstCol) {
    return
  }
  const sumData: any = {
    [firstCol.controlCode]: '合计',
  };
  if (sumcontrols.length > 0) {
    sumcontrols.forEach(sumitem => {
      let num = 0;
      value.forEach(item => {
        num += Number(item[sumitem]) || 0;
      });
      sumData[sumitem] = num.toFixed(2);
    });
  }
  return sumData;
};

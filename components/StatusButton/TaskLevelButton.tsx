import React from 'react';
import { Tag } from 'antd';
import FormItemData from '@/components/CustomForm/FormItem/detail';

function TaskLevelButton(props) {
  const { data, ...rest } = props;
  const getTaskStatusColor = level => {
    switch (level) {
      case 'IMPORTANT_URGENT':
        return 'magenta';
      case 'IMPORTANT_NOT_URGENT':
        return 'red';
      case 'URGENT_NOT_IMPORTANT':
        return 'cyan';
      case 'NOT_URGENT_NOT_IMPORTANT':
        return 'gold';
      default:
        return '#000';
    }
  };

  return (
    <Tag
      color={getTaskStatusColor(data.level)}
      {...rest}
    >
      <FormItemData
        data={{
          controlCode: "level",
          controlLabel: "任务级别",
          controlType: 6,
          extraProps: {
            flag: "taskLevelMap",
            type: 2
          }
        }}
        formdata={data} />
    </Tag>
  );
}

export default TaskLevelButton;

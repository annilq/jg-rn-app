// 已经确认过树形结构中的父级选项可以作为选择2019/7/1
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { JgSelect } from '@/components/CustomForm';

function TaskTag({ dispatch, tags, onChange, value: defaultValue, formdata }) {
  const value = (defaultValue && JSON.parse(defaultValue)) || [];
  const newValue = value.map(item => item.id).join(",");
  function onChangeHandle(selectedTags) {
    if (selectedTags) {
      const newValue = selectedTags.split(",").map(id => tags.find(item => item.id === id));
      onChange(JSON.stringify(newValue));
    }
  }

  useEffect(() => {
    // 所有标签
    dispatch({ type: 'taskConfig/tagAllRemote' });
  }, []);

  // 项目里面有默认标签
  const { projectId } = formdata;
  useEffect(
    () => {
      if (projectId) {
        dispatch({
          type: 'task/taskDefaultData',
          payload: { id: projectId },
          callback(data) {
            if (data && data.tags) {
              const newtag = JSON.parse(data.tags).map(tag => ({
                id: tag.id,
                name: tag.name,
                color: tag.color,
              }));
              onChange(JSON.stringify(newtag));
            }
          },
        });
      }
    },
    [projectId]
  );

  return (
    <JgSelect
      data={tags}
      value={newValue}
      optionKeys={["name", "id"]}
      placeholder="选择标签"
      onChange={onChangeHandle}
      multiple />
  );
}

export default connect(({ taskConfig }) => ({
  tags: taskConfig.tags,
}))(TaskTag);

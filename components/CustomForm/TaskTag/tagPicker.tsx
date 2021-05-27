import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { JgSelect } from '@/components/CustomForm';

function TaskTag({ dispatch, tags, ...rest }) {
  useEffect(() => {
    // 所有标签
    dispatch({ type: 'taskConfig/tagAllRemote' });
  }, []);
  return (
    <JgSelect data={tags} optionKeys={["name", "id"]} placeholder="选择标签" {...rest} />
  );
}

export default connect(({ taskConfig }) => ({
  tags: taskConfig.tags,
}))(TaskTag);

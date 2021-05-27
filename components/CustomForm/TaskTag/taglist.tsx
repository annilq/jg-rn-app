import React from 'react';
import { Tag } from 'antd';
import style from './index.less';

function TagList({ value = [], onChange, onClose, ...rest }) {
  const list =
    value &&
    value.map(item => (
      <Tag
        color={item.color}
        className={style.tag}
        key={item.id}
        onClose={() => onClose(item)}
        {...rest}
        {...onChange && { onClick: () => onChange(item) }}
      >
        <span className={style.dot}>&#9679;</span>
        {item.name}
      </Tag>
    ));
  return <div className={style.taglist}>{list}</div>;
}
export default TagList;

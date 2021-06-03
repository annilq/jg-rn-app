import React from 'react';
import { Image } from "react-native"
import { getConfigFormPath } from '@/routerConfig';

function EditBtn(props) {
  const { data, showEdit,path, onToggle } = props;
  const { actionType } = data;
  const { operations = [] } = getConfigFormPath(path)

  const writeable = actionType === 'write' && operations.includes("EDIT");
  return (
    writeable && !showEdit && (
      <Image src="/images/edit.png"
        style={{
          position: "fixed",
          bottom: "100px",
          right: 10,
          zIndex: 99,
          width: 160,
          height: 160,
        }}
        onClick={onToggle}
      />
    )
  )
}
export default EditBtn;

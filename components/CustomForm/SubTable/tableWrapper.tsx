import React from 'react';
import { PlusOutlined } from '@ant-design/icons';
import tableStyles from "./index.less"

function TableWrapper(props) {
    const { onAddItem, children } = props;
    return (
        <>
            {children}
            {onAddItem && <div
                onClick={onAddItem}
                className={tableStyles["table-addbtn"]}
            > <PlusOutlined style={{ marginRight: "4px" }} />添加
          </div>}
        </>
    );
}

export default TableWrapper;

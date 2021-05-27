import React, { useState } from 'react';
import { connect } from 'react-redux';
import { RightOutlined } from '@ant-design/icons';

import Layer from '@/components/Layer';
import FlowChart from '@/components/FlowChart';
import AuditRecord from '@/components/AuditRecord';
import CommentRecord from '@/components/CommentRecord';
import RelationModule from '@/components/RelationModule';

import styles from '@/components/CustomForm/index.less';
import useLayerVisible from '@/hooks/useLayer';

function App({ id, formCode, data }) {
  const [visible, setVisible] = useLayerVisible(false);
  const [type, setType] = useState(null);
  const { approveInstanceId, relateCount = 0 } = data;

  let modalCom = null;

  switch (type) {
    case 'RelationModule':
      modalCom = <RelationModule domainFormCode={formCode} domainId={id} />;
      break;
    case 'AuditRecord':
      modalCom = (
        <AuditRecord
          instanceId={approveInstanceId}
          title="审批记录"
          key="log"
          store={window.g_app._store}
        />
      );
      break;
    case 'FlowChart':
      modalCom = (
        <FlowChart
          instanceId={approveInstanceId}
          title="审批流程"
          key="flow"
          store={window.g_app._store}
        />
      );
      break;
    case 'CommentRecord':
      modalCom = (
        <CommentRecord
          entity={data}
          formCode={formCode}
          title="评论"
          key="comment"
          store={window.g_app._store}
        />
      );
      break;
    default:
      break;
  }
  const commonModule =
    (
      <div className={styles.linklist}>
        {relateCount > 0 && (
          <div
            className={styles.linkitem}
            onClick={() => {
              setType("RelationModule")
              setVisible(true);
            }}
          >
            <div>关联模块 <span style={{ color: "#ccc", fontSize: 13, marginLeft: 10 }}>已关联{relateCount}条数据</span> </div>  <RightOutlined style={{ color: "#999" }} />
          </div>)}
        {approveInstanceId && (
          <div
            className={styles.linkitem}
            onClick={() => {
              setType("AuditRecord")
              setVisible(true);
            }}
          >
            <div>审批记录</div>   <RightOutlined style={{ color: "#999" }} />
          </div>
        )}
        {approveInstanceId && (
          <div
            className={styles.linkitem}
            onClick={() => {
              setType("FlowChart")
              setVisible(true);
            }}
          >
            <div>审批流程</div>   <RightOutlined style={{ color: "#999" }} />
          </div>
        )}
        <div
          className={styles.linkitem}
          onClick={() => {
            setType("CommentRecord")
            setVisible(true);
          }}
        >
          <div>评论</div>   <RightOutlined style={{ color: "#999" }} />
        </div>
      </div>
    );

  return (
    <>
      {commonModule}
      <Layer
        type="drawer"
        width="100%"
        visible={visible}
      >
        {modalCom}
      </Layer>
    </>
  );
}
export default connect(({ workflow }) => ({
  flowData: workflow.flowData,
}))(App);

import React from 'react';
import { List } from 'antd';
import classNames from 'classnames';

import { getApprovalTypeTextColor } from '@/utils/utils';
import { connect } from 'react-redux';
import FilePreview from '@/components/CustomForm/FilePreview';
import ImagePreview from '@/components/CustomForm/ImagePreview';
// import SectionHeader from '@/components/SectionHeader';

import styles from './index.less';
import Avatar from './avatar.png';

@connect(({ workflow, loading }) => ({
  workflow,
  editLoading: loading.effects['workflow/queryAuditList'] || false,
}))
class AuditList extends React.Component {
  componentDidMount() {
    const { dispatch, instanceId } = this.props;
    dispatch({ type: 'workflow/queryAuditList', payload: { instanceId } });
  }

  render() {
    const {
      workflow: { auditList },
      editLoading,
      ...rest
    } = this.props;
    return (
      <div {...rest}>
        {/* <SectionHeader
          title="审批记录"
          style={{
            width: '100%',
            lineHeight: '50px',
            marginBottom: '0',
            paddingLeft: '28px',
            background: '#fff',
          }}
        />  */}
        <List
          loading={editLoading}
          itemLayout="horizontal"
          dataSource={auditList}
          className={styles.auditList}
          renderItem={(item) => (
            <List.Item className={styles.auditItem}>
              <div
                style={{
                  padding: '20px',
                  flex: 1
                }}
                className={classNames({
                  [styles.tagDivCss]: item && item.operateType === 4,
                })}
              >
                <div style={{ display: 'flex' }}>
                  <img
                    src={item.avatar || Avatar}
                    style={{
                      borderRadius: '50%',
                      width: '60px',
                      height: '60px',
                      objectFit: 'cover',
                    }}
                    alt="头像"
                  />
                  <div
                    style={{
                      marginLeft: '15px',
                    }}
                  >
                    <div>
                      <span style={{ fontWeight: 'bold', color: '#333' }}>{item.operatorName}</span>
                      <span style={{ color: '#999' }}>({item.nodeName})</span>
                      <span style={{ fontWeight: 'bold', color: '#333' }}>({item.spendTime})</span>
                    </div>
                    <div style={{ color: '#999' }}>{item.operateTime}</div>
                    <div
                      style={{
                        color: `${getApprovalTypeTextColor(item.operateType)}`,
                        marginTop: '3px',
                        fontWeight: "bold"
                      }}
                    >
                      [{item.operateTypeDesc}]
                    </div>
                  </div>
                </div>
                {item.opinion && (
                  <div className={styles.auditItemContent}>
                    <div className={styles.label}>
                      审批意见：
                    </div>
                    <span style={{ fontWeight: 'bold' }}>{item.opinion}</span>
                  </div>
                )}
                {item.fileId && (
                  <div className={styles.auditItemContent}>
                    <div className={styles.label}>
                      附件：
                    </div>
                    <FilePreview value={item.fileId} />
                  </div>
                )}
                {item.picId && (
                  <div className={styles.auditItemContent}>
                    <div className={styles.label}>
                      图片：
                    </div>
                    <ImagePreview value={item.picId} />
                  </div>
                )}
                {item.changeHistory && (
                  <div className={styles.auditItemContent}>
                    <div className={styles.label}>
                      修改记录：
                    </div>
                    {item.changeHistory}
                  </div>
                )}
              </div>
            </List.Item>
          )}
          // split={false}
        />
      </div>
    );
  }
}

export default AuditList;

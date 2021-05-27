import React from 'react';
import { DeleteOutlined } from '@ant-design/icons';
import { Popconfirm, Card } from 'antd';
import { connect } from 'react-redux';

import FilePreview from '@/components/CustomForm/FilePreview';
import ImagePreview from '@/components/CustomForm/ImagePreview';
import List from '@/components/DataList';

import styles from './index.less';
import Avatar from './avatar.png';
import CommentForm from './comment';

@connect(({ comment, loading }) => ({
  comment,
  editLoading:
    loading.effects['comment/listRemote'] ||
    loading.effects['comment/addRemote'] ||
    loading.effects['comment/removeRemote'] ||
    false,
}))
class CommentRecord extends React.Component {
  constructor(props) {
    super(props);
    this.scrollParentRef = React.createRef();
  }

  componentDidMount() {
    const { dispatch, entity, formCode } = this.props;
    dispatch({
      type: 'comment/listRemote',
      payload: { entityId: entity.id, moduleCode: formCode },
    });
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'comment/reset',
    });
  }

  remove = params => {
    const { dispatch } = this.props;
    dispatch({ type: 'comment/removeRemote', payload: { id: params.id } });
  };

  render() {
    const {
      comment: { data = {} },
      editLoading,
      entity,
      formCode,
      dispatch,
    } = this.props;
    const listHeight = {
      height: '100vh',
      overflow: 'auto',
    };
    return (
      <div className={styles.list} style={listHeight} ref={this.scrollParentRef}>
        <CommentForm entity={entity} formCode={formCode} store={window.g_app._store} />
        <List
          loading={editLoading}
          data={data}
          loadMore={params => {
            dispatch({ type: 'comment/listRemote', payload: { ...params, entityId: entity.id, moduleCode: formCode } });
          }}
          getScrollParent={() => this.scrollParentRef.current}
          renderItem={item => (
            <List.Item style={{ padding: 0 }}>
              <Card bodyStyle={{ padding: 0 }}>
                <div
                  style={{ display: 'flex', flexDirection: 'row', padding: '10px' }}
                >
                  <img
                    src={item.avatar || Avatar}
                    style={{
                      borderRadius: '50%',
                      width: '60px',
                      height: '60px',
                    }}
                    alt="头像"
                  />
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      flex: 1,
                      fontSize: '14px',
                      marginLeft: '15px',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                      }}
                    >
                      <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <span style={{ fontWeight: 'bold', color: '#333' }}>
                          {item.creatorName}
                        </span>
                      </div>
                      <div
                        style={{
                          marginTop: '3px',
                          fontWeight: 'bold',
                        }}
                      >
                        {item.content}
                      </div>
                    </div>

                    {item.picId ? (
                      <div style={{ marginTop: '10px' }}>
                        <ImagePreview value={item.picId} />
                      </div>
                    ) : null}
                    {item.attachId ? (
                      <div style={{ marginTop: '10px' }}>
                        <FilePreview value={item.attachId} />
                      </div>
                    ) : null}
                    <div style={{ color: '#999', marginTop: '10px' }}>{item.createTime}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Popconfirm
                      title="确认删除？"
                      onConfirm={() => this.remove(item)}
                      okText="确定"
                      cancelText="取消"
                      disabled={item.actionType === 'readonly'}
                    >
                      <a>
                        <DeleteOutlined style={{ color: '#B1B1B1' }} />
                      </a>
                    </Popconfirm>
                  </div>
                </div>
              </Card>
            </List.Item>
          )}
          style={{ backgroundColor: "rgba(245,245,245)", margin: "10px 0" }}
        />
      </div>
    );
  }
}

export default CommentRecord;

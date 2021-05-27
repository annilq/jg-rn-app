import React from 'react';
// import { PlusOutlined } from '@ant-design/icons';
import { Text, View } from 'react-native';

import styles from './index.less';
import closeImage from "./close.png"

interface IProps {
  value: string;
  label: string;
  onDelete: (file: any) => void;
  onPickPhoto: () => void;
}

class FilePreview extends React.PureComponent<IProps> {
  //  附件预览
  handlePreview = index => {
    const files = (this.props.value && JSON.parse(this.props.value)) || [];
    const filedata = files.map(file => this.getNewUrl(file.url));
    const param = {};
    param.data = filedata.join("|");
    param.index = index;
    param.showbtn = true;
    NativeUtil.use("photoPreview", null, param);
  };

  fileItem = (file, index) => {
    const newUrl = this.getNewUrl(file.thumbUrl);
    const { onDelete } = this.props
    return (
      <View key={file.id} className={styles['file-item']}>
        {onDelete && <img
          src={closeImage}
          style={{
            position: "absolute",
            top: "-4px", right: "-4px",
            width: "20px", height: "20px"
          }}
          onClick={() => onDelete(file)}
        />}
        <img alt="图片" src={newUrl} onClick={() => this.handlePreview(index)} />
      </View>
    );
  };

  getNewUrl = url => {
    const historyUrl = /(jgoa\.oss|jgproject\.oss)\S*com/;
    const newUrlHost = 'file.jianguanoa.com';
    const newUrl = url && url.replace(historyUrl, word => {
      if (word.indexOf('jgproject') > -1) {
        return `${newUrlHost}/project`;
      }
      return newUrlHost;
    });
    return newUrl;
  };

  render() {
    const { value, onPickPhoto, label } = this.props
    let previewfiles = []
    if (value) {
      previewfiles = JSON.parse(value)
    }
    const FileListThumb = previewfiles.map(this.fileItem);
    return (
      <>
        {label && <Text className={styles['file-label']}>{label}</Text>}
        <View className={styles['file-list']}>
          {onPickPhoto && <View
            className={styles['file-item']}
            style={{
              border: "1px dashed #e1e1e1",
              display: "flex",
              borderRadius: "10px",
              overflow: "hidden",
              justifyContent: "center"
            }}
            onClick={onPickPhoto}
          >
            {/* <PlusOutlined style={{
              color: "#c8c8c8",
              fontSize: "30px",
              alignSelf: "center"
            }}
            /> */}
          </View>}
          {FileListThumb}
        </View>
      </>
    );
  }
}
export default FilePreview;

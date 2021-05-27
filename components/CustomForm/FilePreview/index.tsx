import React, { PureComponent } from 'react';
import { Text, View } from 'react-native';
// import { LinkOutlined } from '@ant-design/icons';

interface IProps {
  value: string;
  label: string;
}
function isFile(v) {
  return /(.+)\.(docx|doc|wps|ppt|dps|pptx|xls|xlsx|et|pdf|zip|rar|7z|txt)$/gi.test(v);
}

class FilePreview extends PureComponent<IProps> {
  fileItem = file => {
    let newUrl;
    newUrl = this.getNewUrl(file.url);
    const previewUrl = `http://ow365.cn/?i=13262&furl=${newUrl}`
    return (
      <View key={file.id}>
        {isFile(newUrl) ? (
          <Text style={{ color: "#4095ff" }} onClick={() => this.previewFile(previewUrl)}>
            {file.name}
          </Text>
        ) : (
          file.name
        )}
      </View>
    );
  };

  previewFile = (href) => {
    const platform = NativeUtil.use("getDeviceInfo").system;
    if (platform === "iOS") {
      NativeUtil.use("openUrl", null, href);
    } else {
      window.open(href, "_system", "location=no");
    }
  }

  getNewUrl = url => {
    const historyUrl = /(jgoa\.oss|jgproject\.oss)\S*com/;
    const newUrlHost = 'file.jianguanoa.com';
    const newUrl = url.replace(historyUrl, (word) => {
      if (word.indexOf('jgproject') > -1) {
        return `${newUrlHost}/project`;
      }
      return newUrlHost;
    });
    return newUrl;
  };

  render() {
    const { value, label } = this.props;
    const FileListCom = value && JSON.parse(value).filter(item => !!item.url).map(this.fileItem);

    return (FileListCom && FileListCom.length > 0) ? (
      <>
        {label && <Text style={{ "lineHeight": "40px", fontSize: 15, paddingLeft: "12px" }}>
          {label}
        </Text>}
        {FileListCom}
      </>
    ) : false;
  }
}
export default FilePreview;

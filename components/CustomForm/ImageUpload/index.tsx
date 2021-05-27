import React from 'react';
import ImagePreview from '@/components/CustomForm/ImagePreview';
import Services from '@/services';

function transformData(item) {
  return {
    uid: item.id,
    id: item.id,
    name: item.fileName,
    url: item.key,
    thumbUrl: `${item.key}?x-oss-process=image/resize,m_fill,h_100,w_100`,
  };
}
class FileUpload extends React.PureComponent<JgFormProps.IFormProps> {

  onPickPhoto = () => {
    const { value, onChange } = this.props
    NativeUtil.use(
      "pickPhoto",
      (data) => {
        if (data) {
          const files = JSON.parse(data)
          const filedata = files.map(transformData)
          const propsValues = value && JSON.parse(value) || []
          propsValues.push(...filedata)
          onChange(JSON.stringify(propsValues))
        }
      },
      {
        num: 1,
        type: 1
      }
    );
  }

  onDelete = (file) => {
    const { value, onChange } = this.props

    navigator.notification.confirm(
      '是否删除该图片？',
      () => {
        Services.FileApi.del({ id: file.id }).then(() => {
          let files = JSON.parse(value)
          files = files.filter(curfile => curfile.id !== file.id)
          onChange(JSON.stringify(files))
        })
      },
      '删除图片', ['删除', '取消']
    )
  }

  render() {
    const { value, label, ...rest } = this.props
    return (
      <div {...rest}>
        <ImagePreview value={value} onDelete={this.onDelete} label={label} onPickPhoto={this.onPickPhoto} />
      </div>
    );
  }
}
export default FileUpload;

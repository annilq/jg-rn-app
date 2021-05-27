import React, { useState } from 'react';
import { Upload, Button, message } from 'antd';
import { UploadOutlined, ImportOutlined } from '@ant-design/icons';
import Layer from '@/components/Layer';
import request from '@/utils/request';

interface IProps {
  label?: string;
  uploadUrl: string;
  templateUrl?: string;
  fileName?: string;
  onFinishUpload?: (data: any) => {};
}

function CustomUpload(props: IProps) {
  const { fileName = "file", onFinishUpload = () => { }, uploadUrl, templateUrl, label = "导入" } = props
  const [visible, setVisible] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append(fileName, fileList[0]);
    setLoading(true)
    await request(uploadUrl, { data: formData }).then((response) => {
      if (response) {
        message.success(response.info);
        onFinishUpload(response);
        setFileList([]);
        setVisible(false)
      }
    })
    setLoading(false)
  };

  const uploadProps = {
    onRemove: file => {
      setFileList([])
    },
    beforeUpload: file => {
      // 1. 限制文件大小
      const isLt10M = file.size / 1024 / 1024 < 10;
      if (!isLt10M) {
        message.error('文件不能超过10M');
        return false;
      }
      setFileList([file])
      return false;
    },
    fileList,
  };

  return (
    <>
      <Button icon={<ImportOutlined />} type="primary" onClick={() => setVisible(true)}>
        {label}
      </Button>
      <Layer
        type="modal"
        title="Excel模板导入"
        visible={visible}
        footer={[
          <Button key="back" onClick={() => setVisible(false)}>
            取消
          </Button>,
          <Button key="submit" loading={loading} type="primary" onClick={handleUpload} disabled={fileList.length === 0}>
            上传
          </Button>,
        ]}
        onClose={() => setVisible(false)}
        bodyStyle={{ padding: 0 }}
      >
        <div style={{ padding: '16px' }}>
          <Upload {...uploadProps}>
            <Button icon={<UploadOutlined />}>导入模板</Button>
          </Upload>
          <div style={{ marginTop: '16px' }}>
            <a
              href={templateUrl}
              target="_blank"
              download="模板.xlsx"
              style={{ marginRight: '8px' }}
            >
              [下载模板]
              </a>
              请下载Excel模板并按模板要求填入数据, 填报完成后导入模板
            </div>
        </div>
      </Layer>
    </>
  );

}

export default CustomUpload
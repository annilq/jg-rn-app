import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Button, Form } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import Layer from '@/components/Layer';

/**
 * 公共列表查询组件
 * @author hmy
 *
 * @param searchArr     搜索条件
 * @param submit        提交搜索
 * @param clear         重置
 * @param exportData    导出数据
 * @param exportStr     导出操作文案
 * @param loading
 */
class SearchForm extends PureComponent {
  formRef = React.createRef();

  static propTypes = {
    searchArr: PropTypes.array.isRequired,
    submit: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = { visiable: false };
  }

  handleSubmit = values => {
    const { submit } = this.props;
    submit(values);
    this.setVisiable(false);
  };

  handleReset = () => {
    const { reset } = this.props;
    this.formRef.current.resetFields();
    reset();
    this.setVisiable(false);
  };

  handleExport = e => {
    e.preventDefault();

    const { exportData } = this.props;
    this.formRef.current.validateFields().then(exportData);
  };

  setVisiable = visiable => {
    this.setState({ visiable });
  };

  render() {
    const { searchArr = [], reset, exportData, exportStr, loading, children, getContainer = "body" } = this.props;
    const { visiable } = this.state;
    const tailFormItemLayout = {
      labelCol: {
        xs: {
          span: 6,
        },
      },
      wrapperCol: {
        xs: {
          span: 18,
        },
      },
    };
    return (
      <>
        <div
          onClick={() => this.setVisiable(true)}
          style={{
            height: '36px',
            lineHeight: "36px",
            textAlign: 'center',
            backgroundColor: "#ffffff",
            boxShadow: " 0 0 6px 1px #d4deeb",
            borderRadius: "18px",
            color: "#808080"
          }}
        >
          <SearchOutlined style={{ fontSize: '20px', verticalAlign: 'middle' }} />搜索
        </div>
        <Layer
          title=""
          type="drawer"
          width="100%"
          placement="top"
          visible={visiable}
          onClose={() => this.setVisiable(false)}
          getContainer={getContainer}
          height="auto"
        >
          <Form onFinish={this.handleSubmit} style={{ backgroundColor: "#f0f0f0" }} ref={this.formRef}>
            {searchArr.map(v => (
              <Form.Item
                // {...tailFormItemLayout}
                // {...v.label && { label: <span style={{ lineHeight: '36px' }}>{v.label}</span> }}
                key={v.name}
                name={v.name}
                rules={v.rules}
                noStyle
                style={{ border: "none" }}
              >
                {v.component}
              </Form.Item>
            ))}
            {searchArr.length > 0 && (
              <div style={{ textAlign: 'center', padding: "10px 0" }}>
                {children}
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  // icon={<SearchOutlined />}
                  style={{ marginLeft: '10px' }}
                >
                  查询
                </Button>
                {reset ? (
                  <Button
                    style={{ marginLeft: '10px' }}
                    onClick={this.handleReset}
                    disabled={loading}
                  >
                    重置
                  </Button>
                ) : null}
                {exportData ? (
                  <Button
                    style={{ marginLeft: '10px' }}
                    onClick={this.handleExport}
                    disabled={loading}
                  // icon={<DownloadOutlined />}
                  >
                    {exportStr}
                  </Button>
                ) : null}
              </div>
            )}
          </Form>
        </Layer>
      </>
    );
  }
}

export default SearchForm;

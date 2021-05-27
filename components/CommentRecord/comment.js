import React from 'react';
import { Button, Row, Col, Input, message, Form } from 'antd';
import { connect } from 'react-redux';
import { ImageUpload } from '@/components/CustomForm';

const FormItem = Form.Item;
const { TextArea } = Input;
@connect(({ comment }) => ({
  comment,
}))
class CommentForm extends React.Component {
  formRef = React.createRef();

  handleSubmit = values => {
    const { dispatch, entity, formCode } = this.props;
    dispatch({
      type: 'comment/addRemote',
      payload: {
        entityId: entity.id,
        moduleCode: formCode,
        ...values,
      },
      callback: info => {
        message.success(info);
        this.formRef.current.resetFields();
      },
    });
  };

  render() {
    return (
      <div style={{ padding: "0 12px", marginTop: 10 }}>
        <Form
          layout="inline"
          style={{ overflow: 'hidden', flex: 1 }}
          ref={this.formRef}
          onFinish={this.handleSubmit}
        >
          <Row style={{ width: "100%", margin: 0 }}>
            <Col span={24} style={{ padding: 0 }}>
              <FormItem label="" name="content" rules={[{ required: true, message: '请输入评论' }]}>
                <TextArea rows={4} placeholder="发表你的看法吧" style={{ width: '100%' }} />
              </FormItem>
            </Col>
            <Col span={24} style={{ padding: 0 }}>
              <FormItem label="" name="picId">
                <ImageUpload />
              </FormItem>
            </Col>
            <Col span={24} style={{ padding: 0, marginTop: "10px" }}>
              <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
                发表评论
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}

export default CommentForm;

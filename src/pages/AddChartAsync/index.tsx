import { genChartByAiAsyncUsingPOST } from '@/services/ant-design-pro/chartController';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Card, Col, Form, Input, message, Row, Select, Space, Upload } from 'antd';
import { useForm } from 'antd/es/form/Form';
import TextArea from 'antd/es/input/TextArea';
import { useState } from 'react';

/**
 * 添加图表页面
 * @constructor
 */
const AddChartAsync: React.FC = () => {
  const [form] = useForm();
  const [submitting, setsubmitting] = useState<boolean>(false);

  /**
   * 提交
   * @param values
   */
  const onFinish = async (values: any) => {
    //避免重复提交
    if (submitting) {
      return;
    }
    setsubmitting(true);
    //对接后端，上传数据
    const params = {
      ...values,
      file: undefined,
    };
    try {
      const res = await genChartByAiAsyncUsingPOST(params, {}, values.file.file.originFileObj);
      if (!res?.data) {
        message.error('分析失败,' + res.message);
      } else {
        message.success('分析任务提交成功，稍后请在我的图表页面查看');
        form.resetFields();
      }
    } catch (e: any) {
      message.error('分析失败,', +e.message);
    }
    setsubmitting(false);
  };
  return (
    <div className="add-chart-async">
      <Row>
        <Col span={11}>
          <Card title="智能分析">
            <Form
              form={form}
              name="addChart"
              onFinish={onFinish}
              initialValues={{}}
              labelAlign="left"
              labelCol={{ span: 5 }}
            >
              <Form.Item
                name="goal"
                label="分析目标"
                rules={[{ required: true, message: '请输入你的分析目标' }]}
              >
                <TextArea placeholder="请输入你的分析需求，比如：分析该网站的增长情况" />
              </Form.Item>
              <Form.Item
                name="name"
                label="图表名称"
                rules={[{ required: true, message: '请输入你的图表名称' }]}
              >
                <Input placeholder="请输入图表名称" />
              </Form.Item>
              <Form.Item
                name="chartType"
                label="图表类型"
                hasFeedback
                rules={[{ required: true, message: '请输入你的分析需求' }]}
              >
                <Select
                  options={[
                    { value: '折线图', label: '折线图' },
                    { value: '柱状图', label: '柱状图' },
                    { value: '饼图', label: '饼图' },
                    { value: '雷达图', label: '雷达图' },
                    { value: 'K线图', label: 'K线图' },
                    { value: '散点图', label: '散点图' },
                  ]}
                ></Select>
              </Form.Item>
              <Form.Item
                name="file"
                label="原始数据"
                rules={[{ required: true, message: '请输入你的原始数据' }]}
              >
                <Upload name="file" maxCount={1}>
                  <Button icon={<UploadOutlined />}>上传 CSV 文件</Button>
                </Upload>
              </Form.Item>

              <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
                <Space>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={submitting}
                    disabled={submitting}
                  >
                    提交
                  </Button>
                  <Button htmlType="reset">重置</Button>
                </Space>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
};
export default AddChartAsync;

import { genChartByAiUsingPOST } from '@/services/ant-design-pro/chartController';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Card, Col, Form, Input, message, Row, Select, Space, Spin, Upload } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import ReactECharts from 'echarts-for-react';
import { useState } from 'react';
// import SockJS from 'sockjs-client';
// import Stomp from 'stompjs';
/**
 * 添加图表页面
 * @constructor
 */
const AddChart: React.FC = () => {
  // const socket = new SockJS('/ws');
  // const stompClient = Stomp.over(socket);
  // stompClient.connect({}, (frame: any) => {
  //   stompClient.subscribe('/topic/task', (response: any) => {
  //     console.log(response);
  //   });
  // });

  const [chart, setChart] = useState<API.BiResponse>();
  const [submitting, setsubmitting] = useState<boolean>(false);
  const [option, setoption] = useState<any>();

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
      const res = await genChartByAiUsingPOST(params, {}, values.file.file.originFileObj);
      if (!res?.data) {
        message.error('分析失败,' + res.message);
      } else {
        message.success('分析成功');
        const chartOption = JSON.parse(res.data.genChart ?? '');
        if (!chartOption) {
          throw new Error('图表代码解析错误');
        } else {
          setChart(res.data);
          setoption(chartOption);
        }
      }
    } catch (e: any) {
      message.error('分析失败,', +e.message);
    }
    setsubmitting(false);
  };

  // async function callBackend() {
  //   try {
  //     const response = await fetch('/api/text');
  //     if (!response.ok) {
  //       throw new Error(response.statusText);
  //     }
  //     const data = await response.json();
  //     console.log(data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  return (
    <div className="add-chart">
      {/*<Button onClick={callBackend()}>click</Button>*/}
      <Row gutter={24}>
        <Col span={11}>
          <Card title="智能分析">
            <Form
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
        <Col span={13}>
          <Card title="分析结论">
            <div>
              {chart?.genResult}
              {!chart?.genResult && !submitting && <div>请先在左侧进行提交</div>}
              <Spin spinning={submitting} />
            </div>
          </Card>
          <p></p>
          <Card title="生成图表">
            <div>
              {option ? <ReactECharts option={option} /> : <div></div>}
              {!option && !submitting && <div>请先在左侧进行提交</div>}
              <Spin spinning={submitting} />
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};
export default AddChart;

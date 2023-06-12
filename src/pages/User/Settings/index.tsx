import { updateUserUsingPOST } from '@/services/ant-design-pro/userController';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { useModel } from '@umijs/max';
import { Button, Card, Form, Input, message, Space, Upload, UploadFile, UploadProps } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { RcFile, UploadChangeParam } from 'antd/es/upload';
import React, { useEffect, useState } from 'react';

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('你只能上传 JPG/PNG 的文件!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('图片大小不能超过 2MB!');
  }
  return isJpgOrPng && isLt2M;
};
/**
 * 个人设置页面
 * @constructor
 */
const Settings: React.FC = () => {
  const { initialState, setInitialState } = useModel('@@initialState');
  const { currentUser } = initialState;
  // const [usercurrent, setUsercurrent] = useState<API.UserVO>();
  const [loading, setLoading] = useState<boolean>(false);
  const [submitting, setsubmitting] = useState<boolean>(false);
  const [form] = useForm();
  const [imageUrl, setImageUrl] = useState<string>();
  // const [currentUser, setCurrentUser] = useState<API.UserVO>({});
  const [formValues, setFormValues] = useState({});

  useEffect(() => {
    setFormValues(currentUser);
  }, [currentUser]);

  // async function loadData() {
  //   setLoading(true);
  //   try {
  //     const res = await getLoginUserUsingGET();
  //     if (res.data) {
  //       setCurrentUser(res.data);
  //       console.log(currentUser);
  //     } else {
  //       message.error('获取当前用户信息失败');
  //       console.log('false');
  //     }
  //   } catch (e: any) {
  //     message.error('获取当前用户信息失败，' + e.message);
  //   }
  //   setLoading(false);
  // }
  // loadData();
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
      //todo
      const res = await updateUserUsingPOST(params);
      if (!res?.data) {
        message.error('分析失败,' + res.message);
      } else {
        message.success('分析成功');
        const chartOption = JSON.parse(res.data.genChart ?? '');
        if (!chartOption) {
          throw new Error('图表代码解析错误');
        } else {
          // setChart(res.data);
          // setoption(chartOption);
        }
      }
    } catch (e: any) {
      message.error('分析失败,', +e.message);
    }
    setsubmitting(false);
  };

  // useEffect(() => {
  //   loadData();
  // }, [searchParams]);

  const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as RcFile, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <div className="my-chart-page">
      <div className="margin-16" />
      <Card title="个人设置">
        <Form
          form={form}
          name="addChart"
          onFinish={onFinish}
          labelAlign="left"
          labelCol={{ span: 2, offset: 0 }}
        >
          <Form.Item name="name" label="昵称">
            <Input
              size="large"
              placeholder="请输入昵称"
              allowClear
              defaultValue={currentUser.userName}
              // suffix={<ClearOutlined onClick={() => form.setFieldsValue({ name: '' })} />}
            />
          </Form.Item>
          <Form.Item name="avatar" label="头像">
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              beforeUpload={beforeUpload}
              onChange={handleChange}
            >
              {currentUser?.userAvatar ? (
                <img src={currentUser?.userAvatar} alt="avatar" style={{ width: '90%' }} />
              ) : (
                '上传头像'
              )}
            </Upload>
          </Form.Item>
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit" loading={submitting} disabled={submitting}>
                修改
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};
export default Settings;

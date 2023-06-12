import {
  signcountUsingGET,
  signstateUsingGET,
  signUsingPOST,
} from '@/services/ant-design-pro/userController';
import '@umijs/max';
import { Button, message, Tooltip } from 'antd';
import { useEffect, useState } from 'react';
export type SiderTheme = 'light' | 'dark';
export const SelectLang = () => {
  return (
    <UmiSelectLang
      style={{
        padding: 4,
      }}
    />
  );
};
export const Question = () => {
  const [signstate, setSignstate] = useState(false);
  const [signcount, setSigncount] = useState<number>();

  const loadData = async () => {
    const state = await signstateUsingGET();
    if (state.data) {
      setSignstate(true);
    } else {
      setSignstate(false);
    }
    const count = await signcountUsingGET();
    setSigncount(count.data);
  };
  const Click = async () => {
    try {
      const res = await signUsingPOST();
      if (res.data) {
        setSignstate(() => true);
      } else {
        message.error('签到失败');
      }
    } catch (e: any) {
      message.error('签到失败，' + e.message);
    }
    message.success('签到成功');
  };
  useEffect(() => {
    loadData();
  }, [signstate]);

  return (
    <div
    // style={{
    //   display: 'flex',
    //   height: 26,
    // }}
    // onClick={() => {
    //   // window.open('https://pro.ant.design/docs/getting-started');
    // }}
    >
      {/*<QuestionCircleOutlined />*/}
      <Tooltip placement="bottom" color={'blue'} title={'您已连续签到 ' + signcount + ' 天'}>
        <Button
          disabled={signstate}
          onClick={() => {
            Click();
          }}
        >
          {!signstate ? '签到' : '已签到'}
        </Button>
      </Tooltip>
    </div>
  );
};

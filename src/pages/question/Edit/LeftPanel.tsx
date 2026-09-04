import type { FC } from 'react';
import { Tabs } from 'antd';
import { AppstoreOutlined, BarsOutlined } from '@ant-design/icons';
import Layers from './Layers';
import ComponentLib from './ComponentLib';

const LeftPanel: FC = () => {
  const tabsItems = [
    {
      key: 'componentLib',
      label: (
        <span>
          <AppstoreOutlined /> 组件
        </span>
      ),
      children: <ComponentLib />,
    },
    {
      key: 'layers',
      label: (
        <span>
          <BarsOutlined /> 图层
        </span>
      ),
      children: <Layers />,
    },
  ];

  return <Tabs defaultActiveKey="componentLib" items={tabsItems} />;
};

export default LeftPanel;

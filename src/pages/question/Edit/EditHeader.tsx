import { Button, Space, Typography } from 'antd';
import styles from './EditHeader.module.scss';
import { LeftOutlined, EditOutlined, LoadingOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import type { StateType } from '../../../store';
import type { PageInfoType } from '../../../store/pageInfo';
const { Title } = Typography;

const EditHeader = () => {
  const pageInfo = useSelector<StateType>(state => state.pageInfo) as PageInfoType;
  console.log('3.EditHeader pageInfo', pageInfo);
  return (
    <div className={styles['header-wrapper']}>
      <div className={styles.header}>
        <div className={styles.left}>
          <Space>
            <Button type="link" icon={<LeftOutlined />}>
              返回
            </Button>
            <Title level={5}>{pageInfo.title}</Title>
          </Space>
        </div>
        <div className={styles.main}>快捷键</div>
        <div className={styles.right}>
          <Space>
            <Button>保存</Button>
            <Button type="primary">发布</Button>
          </Space>
        </div>
      </div>
    </div>
  );
};

export default EditHeader;

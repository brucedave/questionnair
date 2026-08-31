import type { FC } from 'react';
import ListSearch from '../../components/ListSearch';
import useLoadQuestionListData from '../../hooks/useLoadQuestionListData';
import QuestionCard from '../../components/QuestionCard';
import ListPage from '../../components/ListPage';
import styles from './common.module.scss';
import { Button, Empty, Spin, Typography } from 'antd';
const { Title } = Typography;
const Star: FC = () => {
  const { data = {}, loading, error, refresh } = useLoadQuestionListData({ isStar: true });
  const { list = [], count = 0 } = data;

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>标星问卷</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>

      <div className={styles.content}>
        {loading && (
          <div style={{ textAlign: 'center', marginTop: 100 }}>
            <Spin />
          </div>
        )}
        {!loading && list.length === 0 && <Empty description="暂无数据" />}
        {list.length > 0 && list.map((item: any) => <QuestionCard key={item._id} {...item} />)}
      </div>
      <div className={styles.footer}>
        <ListPage total={count} />
      </div>
    </>
  );
};

export default Star;

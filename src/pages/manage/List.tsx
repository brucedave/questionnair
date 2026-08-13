import type { FC } from 'react';
import ListSearch from '../../components/ListSearch';
import { Typography } from 'antd';
import QuestionCard from '../../components/QuestionCard';
import styles from './common.module.scss';
const { Title } = Typography;
const List: FC = () => {
  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>我的问卷</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <div className={styles.content}>
        <QuestionCard
          _id="1"
          title="问卷1"
          isPublished={false}
          isStar={false}
          answerCount={5}
          createdAt="2026-03-10T13:23:00"
        />
        <QuestionCard
          _id="2"
          title="问卷2"
          isPublished={true}
          isStar={true}
          answerCount={5}
          createdAt="2026-03-10T13:23:00"
        />
        <QuestionCard
          _id="3"
          title="问卷3"
          isPublished={false}
          isStar={false}
          answerCount={0}
          createdAt="2026-03-10T13:23:00"
        />
      </div>
      <div className={styles.footer}>底部</div>
    </>
  );
};

export default List;

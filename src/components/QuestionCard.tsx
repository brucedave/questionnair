import type { FC } from 'react';
import { useState } from 'react';
import { Button, Divider, Tag, Space, Popconfirm, message } from 'antd';
import {
  BarChartOutlined,
  CopyOutlined,
  DeleteOutlined,
  EditOutlined,
  StarFilled,
  StarOutlined,
} from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import styles from './QuestionCard.module.scss';
import { useRequest } from 'ahooks';
import { updateQuestionService, copyQuestionService } from '../services/question';

type PropsType = {
  _id: string;
  title: string;
  isPublished: boolean;
  isStar: boolean;
  answerCount: number;
  createdAt: string;
};

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${month}月${day}日 ${hours}:${minutes}`;
}

const QuestionCard: FC<PropsType> = (props: PropsType) => {
  const { _id, title, isPublished, isStar, answerCount, createdAt } = props;
  const [isStarState, setIsStarState] = useState(isStar);
  const [isDeletedState, setIsDeletedState] = useState(false);

  //修改标星
  const { run: updateStar } = useRequest(
    async () => {
      updateQuestionService(_id, { isStar: !isStarState });
    },
    {
      manual: true,
      onSuccess: () => {
        setIsStarState(!isStarState);
      },
    }
  );

  //修改--删除问卷--假删除-放入回收站
  const { loading: deleteLoading, run: deleteQuestion } = useRequest(
    async () => {
      updateQuestionService(_id, { isDeleted: true });
    },
    {
      manual: true,
      onSuccess: () => {
        setIsDeletedState(true);
      },
    }
  );

  //复制问卷
  const { loading: copyLoading, run: copyQuestion } = useRequest(
    async () => {
      const data = await copyQuestionService(_id);
      return data;
    },
    {
      manual: true,
      onSuccess: res => {
        navigate(`/question/edit/${res._id}`);
      },
    }
  );
  const navigate = useNavigate();

  if (isDeletedState) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <div className={styles.left}>
          <Link to={isPublished ? `/question/stat/${_id}` : `/question/edit/${_id}`}>
            <Space>
              {isStarState && <StarOutlined style={{ color: 'red' }} />}
              {title}
            </Space>
          </Link>
        </div>
        <div className={styles.right}>
          <Space>
            {isPublished ? <Tag color="processing">已发布</Tag> : <Tag>未发布</Tag>}
            <span>答卷:{answerCount}</span>
            <span>{formatDate(createdAt)}</span>
          </Space>
        </div>
      </div>
      <Divider style={{ margin: '12px' }} />
      <div className={styles['button-container']}>
        <div className={styles.left}>
          <Space>
            <Button
              type="text"
              icon={<EditOutlined />}
              size="small"
              onClick={() => navigate(`/question/edit/${_id}`)}
            >
              编辑问卷
            </Button>
            <Button
              type="text"
              icon={<BarChartOutlined />}
              size="small"
              onClick={() => navigate(`/question/stat/${_id}`)}
              disabled={!isPublished}
            >
              问卷统计
            </Button>
          </Space>
        </div>
        <div className={styles.right}>
          <Space>
            <Button
              type="text"
              icon={isStarState ? <StarFilled /> : <StarOutlined />}
              size="small"
              onClick={updateStar}
            >
              {isStarState ? '取消标星' : '标星'}
            </Button>
            <Popconfirm
              title="确定复制该问卷？"
              okText="确定"
              cancelText="取消"
              onConfirm={copyQuestion}
            >
              <Button type="text" icon={<CopyOutlined />} size="small" disabled={copyLoading}>
                复制
              </Button>
            </Popconfirm>
            <Popconfirm
              title="确定删除该问卷？"
              okText="确定"
              cancelText="取消"
              onConfirm={deleteQuestion}
            >
              <Button type="text" icon={<DeleteOutlined />} size="small" disabled={deleteLoading}>
                删除
              </Button>
            </Popconfirm>
          </Space>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;

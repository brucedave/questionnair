import type { FC } from 'react';
import ListSearch from '../../components/ListSearch';
import useLoadQuestionListData from '../../hooks/useLoadQuestionListData';
import { useRequest } from 'ahooks';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import styles from './common.module.scss';
import { Typography, Tag, Table, Button, Space, Empty, Spin, Modal } from 'antd';
import { updateQuestionService, deleteQuestionsService } from '../../services/question';
import { useState } from 'react';
import ListPage from '../../components/ListPage';
const { Title } = Typography;
const { confirm } = Modal;
const Trash: FC = () => {
  const { data = {}, loading, error, refresh } = useLoadQuestionListData({ isDeleted: true });
  const { list = [], count = 0 } = data as { list: { _id: string }[]; count: number };

  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const tableColumns = [
    {
      title: '标题',
      dataIndex: 'title',
    },
    {
      title: '是否发布',
      dataIndex: 'isPublished',
      render: (isPublished: boolean) => {
        return isPublished ? <Tag color="green">已发布</Tag> : <Tag color="red">未发布</Tag>;
      },
    },
    {
      title: '答卷',
      dataIndex: 'answerCount',
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
    },
  ];
  const { run: recover } = useRequest(
    async () => {
      for await (const id of selectedIds) {
        await updateQuestionService(id, { isDeleted: false });
      }
    },
    {
      manual: true,
      debounceWait: 500,
      onSuccess: () => {
        alert('恢复成功');
        refresh();
        setSelectedIds([]);
      },
    }
  );

  const { run: deleteQuestions } = useRequest(
    async () => {
      await deleteQuestionsService(selectedIds);
    },
    {
      manual: true,
      debounceWait: 500,
      onSuccess: () => {
        alert('删除成功');
        refresh();
        setSelectedIds([]);
      },
    }
  );
  function del() {
    confirm({
      title: '确定删除吗？',
      content: '删除后将无法恢复',
      icon: <ExclamationCircleOutlined />,
      onOk: () => {
        deleteQuestions();
      },
    });
  }
  const TableElem = (
    <>
      <Space style={{ marginBottom: 16 }}>
        <Button type="primary" disabled={selectedIds.length === 0} onClick={recover}>
          恢复
        </Button>
        <Button danger type="primary" disabled={selectedIds.length === 0} onClick={del}>
          删除
        </Button>
      </Space>
      <Table
        columns={tableColumns}
        dataSource={list}
        rowKey={record => record._id}
        rowSelection={{
          type: 'checkbox',
          onChange: selectedRowKeys => {
            setSelectedIds(selectedRowKeys as string[]);
          },
        }}
        pagination={false}
      />
    </>
  );

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>回收站</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <div className={styles.content}>
        {loading && (
          <div style={{ textAlign: 'center' }}>
            <Spin />
          </div>
        )}
        {!loading && list.length === 0 && <Empty description="暂无数据" />}
        {list.length > 0 && TableElem}
      </div>
      <div className={styles.footer}>
        <ListPage total={count} />
      </div>
    </>
  );
};

export default Trash;

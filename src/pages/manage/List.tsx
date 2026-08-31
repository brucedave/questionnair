import { useState, useEffect, type FC, useRef } from 'react';
import ListSearch from '../../components/ListSearch';
import { Button, Empty, Spin, Typography } from 'antd';
import QuestionCard from '../../components/QuestionCard';
import styles from './common.module.scss';
import { useRequest, useDebounceFn } from 'ahooks';
import useLoadQuestionListData from '../../hooks/useLoadQuestionListData';
import { useSearchParams } from 'react-router-dom';
import { LIST_PAGE_SIZE, LIST_SEARCH_PARAM_KEY } from '../../constant';
import type { ResDataType } from '../../services/ajax';
import { getQuestionListService } from '../../services/question';
const { Title } = Typography;
const List: FC = () => {
  const [start, setStart] = useState(false);
  const [list, setList] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || '';
  const haveMoreData = total > list.length;

  useEffect(() => {
    setStart(false);
    setList([]); //清空列表
    setPage(1); //重置页码
    setTotal(0); //重置总数
  }, [keyword]); //当搜索框输入时，重置所有信息

  //3.加载数据
  const { run: load, loading } = useRequest(
    async () => {
      const res = await getQuestionListService({ keyword, page, pageSize: LIST_PAGE_SIZE });
      return res;
    },
    {
      manual: true,
      onSuccess: res => {
        const { list: newList, count: newTotal } = res;
        setList(list.concat(newList));
        setTotal(newTotal);
        setPage(prevPage => prevPage + 1);
      },
    }
  );

  const bottomRef = useRef<HTMLDivElement>(null);
  //2. 处理滚动事件,判断是否滚动到底部--元素是否在视口内，在视口内就加载数据
  const { run: handleScroll } = useDebounceFn(
    () => {
      const element = bottomRef.current;
      if (element === null) return;
      const { top } = element.getBoundingClientRect();
      if (top === null) return;
      if (top <= document.documentElement.clientHeight) {
        load();
        setStart(true);
      }
    },
    { wait: 1000 }
  );

  //1. 监听窗口滚动事件
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const bottomElem = () => {
    if (!start || loading) {
      return <Spin />;
    }

    if (!haveMoreData) {
      return <div>没有更多数据</div>;
    }

    if (total === 0) {
      return <Empty description="暂无数据" />;
    }
    return <div>正在加载更多数据...</div>;
  };

  //0. 触发加载
  useEffect(() => {
    handleScroll();
  }, [searchParams]);

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
        {loading && (
          <div style={{ textAlign: 'center', marginTop: 100 }}>
            <Spin />
          </div>
        )}
        {list.length > 0 && list.map((item: any) => <QuestionCard key={item._id} {...item} />)}
      </div>
      <div className={styles.footer}>
        <div ref={bottomRef}>{bottomElem()}</div>
      </div>
    </>
  );
};

export default List;

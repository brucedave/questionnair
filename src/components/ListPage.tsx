//分页组件抽离
import { type FC, useEffect, useState } from 'react';
import { Pagination } from 'antd';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import { LIST_PAGE_SIZE, LIST_PAGE_SIZE_PARAM_KEY, LIST_PAGE_PARAM_KEY } from '../constant';
interface PropsType {
  total: number;
}
const ListPage: FC<PropsType> = props => {
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(LIST_PAGE_SIZE);
  const { total } = props;
  const [searchParams] = useSearchParams();
  useEffect(() => {
    const page = parseInt(searchParams.get(LIST_PAGE_PARAM_KEY) || '') || 1;
    setCurrent(page);
    const pageSize = parseInt(searchParams.get(LIST_PAGE_SIZE_PARAM_KEY) || '') || LIST_PAGE_SIZE;
    setPageSize(pageSize);
  }, [searchParams]);
  const location = useLocation();
  const navigate = useNavigate();

  function handlePageChange(page: number, pageSize: number) {
    searchParams.set(LIST_PAGE_PARAM_KEY, page.toString());
    searchParams.set(LIST_PAGE_SIZE_PARAM_KEY, pageSize.toString());
    navigate({
      pathname: location.pathname,
      search: searchParams.toString(),
    });
  }
  return (
    <Pagination total={total} current={current} pageSize={pageSize} onChange={handlePageChange} />
  );
};
export default ListPage;

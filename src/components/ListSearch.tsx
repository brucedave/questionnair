import { Input } from 'antd';
import type { FC, ChangeEvent } from 'react';
import { useEffect, useState } from 'react';
import { LIST_SEARCH_PARAM_KEY } from '../constant';
import { useLocation, useSearchParams, useNavigate } from 'react-router-dom';

const { Search } = Input;

const ListSearch: FC = () => {
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [value, setValue] = useState('');
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
  }

  useEffect(() => {
    const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || '';
    setValue(keyword);
  }, [searchParams]);

  function handleSearch(value: string) {
    navigate({
      pathname,
      search: `${LIST_SEARCH_PARAM_KEY}=${value}`,
    });
  }

  return (
    <div>
      <Search
        size="large"
        placeholder="输入关键词搜索"
        style={{ width: '200px' }}
        value={value}
        onChange={handleChange}
        onSearch={handleSearch}
      />
    </div>
  );
};

export default ListSearch;

import { useRequest } from 'ahooks';
import { getQuestionListService } from '../services/question';
import { useSearchParams } from 'react-router-dom';
import {
  LIST_PAGE_PARAM_KEY,
  LIST_PAGE_SIZE_PARAM_KEY,
  LIST_SEARCH_PARAM_KEY,
  LIST_PAGE_SIZE,
} from '../constant';

type SearchOption = {
  isStar?: boolean;
  isDeleted?: boolean;
};

function useLoadQuestionListData(opt: Partial<SearchOption> = {}) {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || '';
  const page = parseInt(searchParams.get(LIST_PAGE_PARAM_KEY) || '') || 1;
  const pageSize = parseInt(searchParams.get(LIST_PAGE_SIZE_PARAM_KEY) || '') || 10;
  const { isStar, isDeleted } = opt;
  const { data, loading, error, refresh } = useRequest(
    () => getQuestionListService({ keyword, isStar, isDeleted, page, pageSize }),
    {
      refreshDeps: [searchParams],
    }
  );
  return { data, loading, error, refresh };
}

export default useLoadQuestionListData;

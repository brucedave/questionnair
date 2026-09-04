import { useRequest } from 'ahooks';
import { getQuestionService } from '../services/question';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { initComponents } from '../store/componentsReducer';
import { setPageInfo } from '../store/pageInfo';
import { useEffect } from 'react';

const useLoadQuestionData = () => {
  const { id = '' } = useParams();
  const dispatch = useDispatch();
  const {
    data,
    loading,
    error,
    run: load,
  } = useRequest(
    async (id: string) => {
      if (!id) throw new Error('没有问卷');
      const res = await getQuestionService(id as string);
      return res;
    },
    {
      manual: true,
      onSuccess: res => {
        console.log(res);
      },
    }
  );

  useEffect(() => {
    load(id);
  }, [id]);

  useEffect(() => {
    if (!data) return;
    const {
      title = '',
      desc = '',
      js = '',
      css = '',
      isPublished = false,
      componentList = [],
    } = data || {};
    console.log('1.useLoadQuestionData data', data);
    let selectedId = '';
    if (componentList.length > 0) {
      selectedId = componentList[0].fe_id;
    }
    if (!loading) {
      dispatch(initComponents({ componentList, selectedId }));
      dispatch(setPageInfo({ title, desc, js, css, isPublished }));
    }
  }, [data, loading, dispatch]);

  return {
    loading,
    error,
    data,
  };
};

export default useLoadQuestionData;

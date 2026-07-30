import { useEffect, useState } from 'react';
import { useRequest } from 'ahooks';
import { useDispatch } from 'react-redux';
import useGetUserInfo from './useGetUserInfo';
import { getUserInfoService } from '../services/user';
import { loginReducer } from '../store/userReducer';
function useLoadUserData() {
  const dispatch = useDispatch();
  const [waitingUserData, setWaitingUserData] = useState(true);
  //ajax加载用户信息，放在redux中，不用返回
  const { run } = useRequest(getUserInfoService, {
    manual: true,
    onSuccess(result) {
      const { username, nickname } = result;
      //将用户信息存储到redux store中
      dispatch(loginReducer({ username, nickname }));
    },
    onFinally() {
      setWaitingUserData(false);
    },
  });

  //判断当前redux store是否已经存在用户信息
  const { username } = useGetUserInfo(); //redux store中获取用户信息
  useEffect(() => {
    if (username) {
      setWaitingUserData(false);
      return;
    }
    run();
  }, [username]);
  return { waitingUserData };
}
export default useLoadUserData;
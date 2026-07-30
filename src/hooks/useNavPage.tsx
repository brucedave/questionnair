import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useGetUserInfo from './useGetUserInfo';
import { isLoginOrRegister,
    isNoNeedUserInfo,
    MANAGE_INDEX_PATHNAME,
    LOGIN_PATHNAME, 
} from '../router/constants';

export default function useNavPage( waitingUserInfo: boolean) {
    const { username } = useGetUserInfo();
    const { pathname } = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (waitingUserInfo) {
            return;
        }
        if(username){
            if(isLoginOrRegister(pathname)){
                navigate(MANAGE_INDEX_PATHNAME);
            }
            return;
        }

        if(isNoNeedUserInfo(pathname)){
            return;
        }else{
        navigate(LOGIN_PATHNAME);
        }


    }, [waitingUserInfo, username, pathname]);

}
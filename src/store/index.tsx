import { configureStore } from '@reduxjs/toolkit';
import userReducer, { type UserStateType } from './userReducer';
import pageInfoReducer, { type PageInfoType } from './pageInfo';
import componentsReducer, { type ComponentsInfoType } from './componentsReducer';

export type StateType = {
  user: UserStateType;
  pageInfo: PageInfoType;
  components: ComponentsInfoType;
};

export default configureStore({
  reducer: {
    user: userReducer, //用户信息
    pageInfo: pageInfoReducer, //问卷页面信息
    components: componentsReducer, //问卷组件列表
  },
});
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { ComponentPropsType } from '../../components/QuestionComponents';

export type ComponentInfoType = {
  fe_id: string;
  type: string;
  isHidden: boolean;
  isLocked: boolean;
  props: ComponentPropsType;
};

export type ComponentsInfoType = {
  selectedId: string;
  componentList: ComponentInfoType[];
};

const INIT_STATE: ComponentsInfoType = {
  selectedId: '',
  componentList: [],
};

const componentsSlice = createSlice({
  name: 'components',
  initialState: INIT_STATE,
  reducers: {
    //初始化问卷列表组件数据
    initComponents(_state, action: PayloadAction<ComponentsInfoType>) {
      return action.payload;
    },
  },
});

export const { initComponents } = componentsSlice.actions;

export default componentsSlice.reducer;

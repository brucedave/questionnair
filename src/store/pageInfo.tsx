import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type PageInfoType = {
  title: string;
  desc: string;
  js: string;
  css: string;
  isPublished: boolean;
};

const pageInfoSlice = createSlice({
  name: 'pageInfo',
  initialState: {
    title: '',
    desc: '',
    js: '',
    css: '',
    isPublished: false,
  },
  reducers: {
    setPageInfo(state: PageInfoType, action: PayloadAction<PageInfoType>) {
      return action.payload;
    },
  },
});

export const { setPageInfo } = pageInfoSlice.actions;

export default pageInfoSlice.reducer;

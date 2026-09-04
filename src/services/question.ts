import axios, { type ResDataType } from './ajax';

export type SearchOption = {
  keyword: string;
  isStar: boolean;
  isDeleted: boolean;
  pageSize: number;
  pageNum: number;
};

export async function getQuestionListService(
  opt: Partial<SearchOption> = {}
): Promise<ResDataType> {
  const data = (await axios.get(`/api/question`, { params: opt })) as ResDataType;
  return data;
}

export async function createQuestionService(): Promise<ResDataType> {
  const data = (await axios.post(`/api/question`)) as ResDataType;
  return data;
}

export async function updateQuestionService(
  _id: string,
  opt: { [key: string]: any }
): Promise<ResDataType> {
  const res = await axios.patch(`/api/question/${_id}`, opt);
  return res.data;
}

export async function copyQuestionService(_id: string): Promise<ResDataType> {
  const res = await axios.post(`/api/question/duplicate/${_id}`);
  return res;
}

export async function deleteQuestionsService(ids: string[]): Promise<ResDataType> {
  const res = await axios.delete(`/api/question`, { data: { ids } });
  return res as ResDataType;
}

//拿单个问卷数据 get /api/question/:id
export async function getQuestionService(_id: string): Promise<ResDataType> {
  const res = await axios.get(`/api/question/${_id}`);
  return res as ResDataType;
}

import axios, { type ResDataType } from './ajax';
//获取用户信息
export async function getUserInfoService(): Promise<ResDataType> {
  const url = '/api/user/info';
  const data = (await axios.get(url)) as ResDataType;
  return data;
}





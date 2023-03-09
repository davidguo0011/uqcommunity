/* eslint-disable consistent-return */
import axios from 'axios';
import config from '../config/config';

export const getMessages = async (data) => {
  const path = `${config.apiAddress}/chat/secure/queryMsgHistory`;
  const result = await axios.post(path, data);
  return result.data;
};

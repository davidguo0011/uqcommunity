/* eslint-disable consistent-return */
import axios from 'axios';
import config from '../config/config';

export const signup = async (data) => {
  const path = `${config.apiAddress}/community/signUp`;
  const result = await axios.post(path, data);
  return result.data;
};

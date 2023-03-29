/* eslint-disable consistent-return */
import axios from 'axios';
import config from '../config/config';

export const getGroups = async (data) => {
  const path = `${config.apiAddress}/chat/secure/queryGroups`;
  const configHeader = {
    headers: {
      Authorization: localStorage.getItem('access_token') ?? '',
    },
  };
  const result = await axios.post(path, data, configHeader);
  return result.data;
};

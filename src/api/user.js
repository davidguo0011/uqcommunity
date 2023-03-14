/* eslint-disable consistent-return */
import axios from 'axios';
import config from '../config/config';

export const updateUserAvatar = async (data) => {
  const path = `${config.apiAddress}/chat/secure/updateUserAvatar`;
  const configHeader = {
    headers: {
      Authorization: localStorage.getItem('access_token') ?? '',
    },
  };
  const result = await axios.post(path, data, configHeader);
  return result.data;
};

export const updateUserInfo = async (data) => {
  const path = `${config.apiAddress}/chat/secure/updateUserInfo`;
  const configHeader = {
    headers: {
      Authorization: localStorage.getItem('access_token') ?? '',
    },
  };
  const result = await axios.post(path, data, configHeader);
  return result.data;
};

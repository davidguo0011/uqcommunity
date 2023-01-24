/* eslint-disable consistent-return */
import axios from 'axios';
import config from '../config/config';

export const getFriends = async (data) => {
  const path = `${config.apiAddress}/chat/secure/queryFriends`;
  const configHeader = {
    headers: {
      Authorization: localStorage.getItem('access_token') ?? '',
    },
  };
  const result = await axios.post(path, data, configHeader);
  return result.data;
};

export const acceptFriendRequest = async (data) => {
  const path = `${config.apiAddress}/chat/secure/addFriends`;
  const configHeader = {
    headers: {
      Authorization: localStorage.getItem('access_token') ?? '',
    },
  };
  const result = await axios.post(path, data, configHeader);
  return result.data;
};

// {
//   "sendId":4,
//   "sendName":"袁子奇",
//   "receiverId":9,
//   "receiverName":"david",
//   "action":1
// }

export const updateOnlineStatus = (friends, message) => {
  const updatedFriends = JSON.parse(JSON.stringify(friends));

  message.data.forEach((status) => {
    updatedFriends.forEach((friend) => {
      if (status.id === friend.id) {
        friend.onlineStatus = status.status;
      }
    });
  });
  return updatedFriends;
};
//[{"age":0,"gender":0,"id":6,"status":"offline"},{"age":0,"gender":0,"id":7,"status":"offline"}]

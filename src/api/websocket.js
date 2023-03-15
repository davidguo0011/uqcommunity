export const initWebsocket = (data) => {
  const socket = new WebSocket('ws://47.104.72.151:8088/chat');
  socket.onopen = function () {
    console.log('连接建立成功');
    socket.send(JSON.stringify(data));
  };
  socket.onclose = function () {
    console.log('连接关闭');
  };

  return socket;
};

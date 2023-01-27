export const initWebsocket = (data) => {
  const socket = new WebSocket('ws://400f2177.nat123.fun:54197/chat');
  socket.onopen = function () {
    console.log('连接建立成功');
    socket.send(JSON.stringify(data));
  };
  socket.onclose = function () {
    console.log('连接关闭');
  };

  return socket;
};

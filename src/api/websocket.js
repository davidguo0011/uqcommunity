export const initWebsocket = () => {
  const socket = new WebSocket('ws://400f2177.nat123.fun:54197/chat');
  socket.onopen = function () {
    console.log('连接建立成功');
    socket.send(
      JSON.stringify({
        type: 1,
        sendId: parseInt(localStorage.getItem('userId')),
        message: 'online',
      })
    );
  };
  socket.onclose = function () {
    console.log('连接关闭');
  };

  return socket;
};

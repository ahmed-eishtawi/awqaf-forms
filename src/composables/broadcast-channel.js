const channel = new BroadcastChannel("sync-data");

const useBroadcastChannel = () => {
  const broadcast = (data) => {
    channel.postMessage(data);
  };

  const receive = (callback) => {
    channel.onmessage = (message) => {
      callback(message.data);
    };
  };

  return {
    broadcast,
    receive,
  };
};
export default useBroadcastChannel;

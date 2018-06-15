// @flow
import socketIOClient from 'socket.io-client';

export const initSocket = (
  endpoint: string = 'https://api.doondoony.com/crypto'
) => {
  return socketIOClient(endpoint);
};

/**
 * ticker 데이터를 가져오는 함수
 * @param {Function} socket
 * @param {String} name
 * @returns {Array} tickerData
 */
export const fetchTickerData = (socket: Function, name: string): Array<{}> => {
  if (typeof socket !== 'object' || typeof name !== 'string') {
    return [];
  }
  socket.on(name, data => {
    console.log(name);
  });

  return [
    {
      value: 'hello'
    }
  ];
};

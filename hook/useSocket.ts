import { useRef } from 'react';
import socket, { Socket } from 'socket.io-client';

export const useSocket = () => {
  const ioRef = useRef<Socket>();
  ioRef.current = socket('http://localhost:3001');
  return ioRef.current;
};

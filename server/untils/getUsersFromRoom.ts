export const getUsersFromRoom = (rooms: Record<string, any>, roomId) =>
  Object.values(rooms)
    .filter((obj) => obj.roomId === roomId)
    .map((obj) => obj.user);

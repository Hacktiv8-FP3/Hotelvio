import { Guest } from '../redux/guest';

const calculateGuest = (rooms: Guest[]) => {
  let total = 0;
  rooms.forEach((room) => {
    total += room.adults + room.children.length;
  });
  return total;
};

export default calculateGuest;

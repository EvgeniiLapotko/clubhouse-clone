import { Header } from '../../components/Header';
import { BackButton } from '../../components/BackButton';
import { RoomView } from '../../components/RoomView';
import axios from '../../core/axios';

export default function Id({ room }) {
  return (
    <>
      <Header />
      <div className={'container'}>
        <BackButton title={'All rooms'} />
        <RoomView title={room?.title} />
      </div>
    </>
  );
}

export const getServerSideProps = async (context) => {
  const { query } = context;
  try {
    const { data } = await axios.get('/rooms.json');
    const currentRoom = data.find((room) => room._id === query.id);
    return {
      props: {
        room: currentRoom,
      },
    };
  } catch (e) {
    console.log(e);
    return {
      props: {
        room: {},
      },
    };
  }
};

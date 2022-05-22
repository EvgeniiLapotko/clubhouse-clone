import { Header } from '../../components/Header';
import { BackButton } from '../../components/BackButton';
import { RoomView } from '../../components/RoomView';
import axios from '../../core/axios';
import { checkAuth } from '../../helpers/checkAuth';

export default function Id({ room, user }) {
  if (typeof window !== undefined) {
    console.log(room);
  }
  return (
    <>
      <Header user={user.data} />
      <div className={'container'}>
        <BackButton title={'All rooms'} />
        <RoomView title={room?.title} />
      </div>
    </>
  );
}

export const getServerSideProps = async (ctx) => {
  const { query } = ctx;
  try {
    const user = await checkAuth(ctx);
    if (!user) {
      return {
        props: [],
        redirect: {
          destination: '/',
        },
      };
    }
    const { data } = await axios.get(`rooms/${query.id}`);
    return {
      props: {
        user,
        room: data,
      },
    };
  } catch (e) {
    console.log(e);
    return {
      props: {
        rooms: [],
        user: { data: {} },
      },
    };
  }
};

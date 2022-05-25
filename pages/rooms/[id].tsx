import { Header } from '../../components/Header';
import { BackButton } from '../../components/BackButton';
import { RoomView } from '../../components/RoomView';
import axios from '../../core/axios';
import { checkAuth } from '../../helpers/checkAuth';
import { wrapper } from '../../redux/store';

export default function Id({ room }) {
  if (typeof window !== undefined) {
    // console.log(room);
  }
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

export const getServerSideProps = wrapper.getServerSideProps((store) => async (ctx) => {
  const { query } = ctx;
  try {
    const user = await checkAuth(ctx, store);
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
});

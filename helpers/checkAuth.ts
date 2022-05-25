import { GetServerSidePropsContext } from 'next';
import nookies from 'nookies';
import axios from '../core/axios';
import { UserApi } from '../api/UserApi';
import { fetchRooms } from '../redux/slices/roomSlice';
import { setUser } from '../redux/slices/userSlice';

export const checkAuth = async (ctx: GetServerSidePropsContext, store): Promise<any | boolean> => {
  try {
    const { token } = nookies.get(ctx);
    if (token) {
      //@ts-ignore
      axios.defaults.headers.Authorization = 'Bearer ' + token;
    }
    const user = await UserApi.getMe();
    await store.dispatch(setUser(user));
    return user;
  } catch (e) {
    console.log(e);
    return false;
  }
};

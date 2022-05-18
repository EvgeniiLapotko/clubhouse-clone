import { GetServerSidePropsContext } from 'next';
import nookies from 'nookies';
import axios from '../core/axios';
import { UserApi } from '../api/UserApi';
import { UserData } from '../pages';

export const checkAuth = async (ctx: GetServerSidePropsContext): Promise<any | boolean> => {
  try {
    const { token } = nookies.get(ctx);
    if (token) {
      axios.defaults.headers.Authorization = 'Bearer ' + token;
    }
    const user = await UserApi.getMe();
    return user;
  } catch (e) {
    console.log(e);
    return false;
  }
};

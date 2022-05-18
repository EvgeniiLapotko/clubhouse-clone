import { GetServerSidePropsContext } from 'next';
import nookies from 'nookies';
import axios from '../core/axios';
import { UserApi } from '../api/UserApi';

export const checkAuth = async (ctx: GetServerSidePropsContext): Promise<boolean> => {
  try {
    const { token } = nookies.get(ctx);
    if (token) {
      axios.defaults.headers.Authorization = 'Bearer ' + token;
    }
    await UserApi.getMe();
    return true;
  } catch (e) {
    return false;
  }
};

import { UserData } from '../pages';
import Axios from '../core/axios';

export const UserApi = {
  getMe: (): Promise<UserData> => {
    const { data } = Axios.get('/auth/me');
    return data;
  },
};

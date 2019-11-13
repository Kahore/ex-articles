import axios from 'axios';
import { UserSubmit, User, NewUser } from '../store/models';
import users from '@/store/modules/users';
let URL = 'http://localhost:5000/api/auth/';
if (process.env.NODE_ENV === 'production') {
  URL = '/api/auth/';
}

class AuthService {
  /**
   * loginUser
   */
  public static async loginUser(user: UserSubmit): Promise<User> {
    try {
      const response = await axios.get(URL, {
        params: {
          user,
        },
      });
      return response.data as User;
    } catch (error) {
      users.setError(error);
      return error;
    }
  }
  /**
   * registerUser
   */
  public static async registerUser(user: NewUser): Promise<User> {
    const response = await axios.post(URL, {
      user,
    });
    return response.data as User;
  }
}

export default AuthService;

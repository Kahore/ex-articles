import axios from 'axios';
import { UserSubmit, User } from '../store/models';
let URL = 'http://localhost:5000/api/auth/';
if (process.env.NODE_ENV === 'production') {
   URL = '/api/auth/';
}

class AuthService {
  public static async loginUser(user: UserSubmit): Promise<User> {
      const response = await axios.get(URL, {
         params: {
          user,
         },
      });
      return (response.data as User);
  }
}
export default AuthService;

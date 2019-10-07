import axios from 'axios';
import { User, Profile, FollowRelationship, ProfileRequest } from '../store/models';
let URL = 'http://localhost:5000/api/users/';
if (process.env.NODE_ENV === 'production') {
   URL = '/api/users/';
}
class UserService {
  /**
   * updateUserInfo
   */
  public static async updateUserInfo(user: User) {
    const response = await axios.put(URL, {
      user,
    });
    return (response.data as User);
  }
  /**
   * loadProfile
   */
  public static async loadProfile(payload: ProfileRequest) {
    const response = await axios.get(URL, {
      params: {
        profileId: payload.profileId,
        userId: payload.userId,
      },
    });
    return (response.data as Profile);
  }
  /**
   * followToggler
   */
  public followToggler(followRelationship: FollowRelationship) {
    return axios.post(URL, {
      followRelationship,
    });
  }
}
export default UserService;

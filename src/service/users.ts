import axios from 'axios';
import { User, Profile, FollowToggler, ProfileRequest } from '../store/models';
let URL = 'http://localhost:5000/api/users/';
if (process.env.NODE_ENV === 'production') {
  URL = '/api/users/';
}
class UserService {
  /**
   * updateUserInfo
   */
  public static async updateUserInfo(user: User) {
    const response = await axios.put(URL + user._id, {
      user,
    });
    return response.data as User;
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
    return response.data as Profile;
  }
  /**
   * followToggler
   */
  public static async follow(payload: FollowToggler) {
    let response;
    if (payload.mode === 'add') {
      response = await this.followAdd(payload);
    } else {
      response = await this.followDelete(payload);
    }
    return response;
  }

  private static async followAdd(payload: FollowToggler) {
    const response = await axios.post(URL + payload.profileId + '/follow', {
      id: payload.userId,
    });
    return response.data as Profile;
  }
  private static async followDelete(payload: FollowToggler) {
    const response = await axios.delete(URL + payload.profileId + '/follow', {
      params: { id: payload.userId },
    });
    return response.data as Profile;
  }
}
export default UserService;

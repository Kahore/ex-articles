import { VuexModule, Module, getModule, MutationAction, Mutation, Action} from 'vuex-module-decorators';
import store from '../store';
import { User, Profile, UserSubmit, ProfileRequest, NewUser } from '../models';
import authService from '../../service/auth';
import usersService from '../../service/users';
@Module({
  dynamic: true,
  namespaced: true,
  name: 'users',
  store,
})
class UserModule extends VuexModule {
  public user: User | null = null;
  public profile: Profile | null = null;

  public get username(): string | null {
    return (this.user && this.user.username) || null;
  }
  public get userId(): string {
    return (this.user && this.user._id) || '';
  }

  @Mutation
  public setLocalAuth(user: User): void {
    this.user = user;
  }
  @Mutation
  public logOut(): void {
    this.user = null;
    localStorage.removeItem('user_auth');
  }
  @Action({commit: 'setLocalAuth'})
  public localAuth() {
    const userLocal: string | null = localStorage.getItem('user_auth');
    if (userLocal !== null) {
      const user = JSON.parse(userLocal);
      return user;
    }
  }

  @MutationAction
  public async login(userSubmit: UserSubmit) {
    const user = await authService.loginUser(userSubmit);
    localStorage.setItem('user_auth', JSON.stringify(user));
    return { user };
  }
  @MutationAction
  public async register(newUser: NewUser) {
    const user = await authService.registerUser(newUser);
    localStorage.setItem('user_auth', JSON.stringify(user));
    return { user };
  }
  @MutationAction
  public async loadProfile(payload: ProfileRequest) {
    const profile = await usersService.loadProfile(payload);
    return { profile };
  }
}

export default getModule(UserModule);

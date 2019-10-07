import { VuexModule, Module, getModule, MutationAction, Mutation, Action} from 'vuex-module-decorators';
import store from '../store';
import { User, Profile, UserSubmit } from '../models';
import authService from '../../service/auth';
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

  @Mutation
  public setlocalAuth(user: User): void {
    this.user = user;
  }
  @Mutation
  public logOut(): void {
    this.user = null;
    localStorage.removeItem('user_auth');
  }
  @Action({commit: 'setlocalAuth'})
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
}

export default getModule(UserModule);

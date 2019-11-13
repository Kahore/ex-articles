import {
  VuexModule,
  Module,
  getModule,
  MutationAction,
  Mutation,
  Action,
} from 'vuex-module-decorators';
import store from '../store';
import {
  User,
  Profile,
  UserSubmit,
  ProfileRequest,
  NewUser,
  FollowToggler,
  FavoriteToggler,
} from '../models';
import authService from '../../service/auth';
import usersService from '../../service/users';
import articleService from '../../service/articles';
@Module({
  dynamic: true,
  namespaced: true,
  name: 'users',
  store,
})
class UserModule extends VuexModule {
  public user: User = {
    _id: '',
    bio: '',
    email: '',
    image: '',
    username: '',
    following: [],
  };
  public profile: Profile | null = null;
  public errorMsg: string = '';
  public get username(): string | null {
    return (this.user && this.user.username) || null;
  }
  public get userId(): string {
    return (this.user && this.user._id) || '';
  }

  public get getErrorMsg(): string {
    return this.errorMsg;
  }
  @Mutation
  public setLocalAuth(user: User): void {
    this.user = user;
  }
  @Mutation
  public logOut(): void {
    this.user = {
      _id: '',
      bio: '',
      email: '',
      image: '',
      username: '',
      following: [],
    };
    localStorage.removeItem('user_auth');
  }
  @Mutation
  public resetProfile(): void {
    this.profile = null;
  }
  @Action({ commit: 'setLocalAuth' })
  public localAuth() {
    const userLocal: string | null = localStorage.getItem('user_auth');
    if (userLocal !== null) {
      const user = JSON.parse(userLocal);
      return user;
    }
  }
  // @ts-ignore
  @MutationAction
  public setError(errMsg: string) {
    const errorMsg: string = errMsg;
    return { errorMsg };
  }
  @MutationAction
  public async login(userSubmit: UserSubmit) {
    const user = await authService.loginUser(userSubmit);
    if (typeof user !== 'undefined') {
      localStorage.setItem('user_auth', JSON.stringify(user));
    }
    return { user };
  }
  @MutationAction
  public async register(newUser: NewUser) {
    const user = await authService.registerUser(newUser);
    localStorage.setItem('user_auth', JSON.stringify(user));
    return { user };
  }
  @MutationAction
  public async updateUser(userInfo: User) {
    const user = await usersService.updateUserInfo(userInfo);
    localStorage.setItem('user_auth', JSON.stringify(user));
    return { user };
  }
  @MutationAction
  public async loadProfile(payload: ProfileRequest) {
    const profile = await usersService.loadProfile(payload);
    return { profile };
  }
  @MutationAction
  public async followToggler(payload: FollowToggler) {
    const user = await usersService.follow(payload);
    localStorage.setItem('user_auth', JSON.stringify(user));
    return { user };
  }
  @MutationAction
  public async favoriteToggler(payload: FavoriteToggler) {
    const user = await articleService.favorite(payload);
    localStorage.setItem('user_auth', JSON.stringify(user));
    return { user };
  }
}

export default getModule(UserModule);

import { VuexModule, Module, getModule} from 'vuex-module-decorators';
import store from '../store';
import { User, Profile } from '../models';

@Module({
  dynamic: true,
  namespaced: true,
  name: 'users',
  store,
})
class UserModule extends VuexModule {
  public user: User | null = null;
  public profile: Profile | null = null;
}

export default getModule(UserModule);

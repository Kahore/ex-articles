import {
  VuexModule,
  Module,
  getModule,
  MutationAction,
} from 'vuex-module-decorators';
import store from '../store';
import tagService from '../../service/tags';
@Module({
  dynamic: true,
  namespaced: true,
  name: 'tags',
  store,
})
class TagsModule extends VuexModule {
  public tagList: string[] = [];

  @MutationAction
  public async getTags() {
    const tagList = await tagService.getTags();
    return { tagList };
  }
}

export default getModule(TagsModule);

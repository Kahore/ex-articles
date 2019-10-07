import { VuexModule, Module, getModule, Mutation, Action} from 'vuex-module-decorators';
import store from '../store';
import { Article } from '../models';
import articlesService from '../../service/articles';

@Module({
  dynamic: true,
  namespaced: true,
  name: 'articles',
  store,
})
class ArticlesModule extends VuexModule {
  public globalFeed: Article[] = [];
  public userFeed: Article[] = [];

  @Mutation
  public setGlobalFeed(articles: Article[]) {
    this.globalFeed = articles;
  }
  @Action({commit: 'setGlobalFeed'})
  public async refreshGlobalFeed() {
    const globalFeed = articlesService.getArticles();
    return globalFeed;
  }
}


export default getModule(ArticlesModule);

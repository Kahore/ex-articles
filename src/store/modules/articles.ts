import { VuexModule, Module, getModule, Mutation, Action} from 'vuex-module-decorators';
import store from '../store';
import { Article, NewArticle } from '../models';
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
  public profilesArticle: Article[] = [];

  @Mutation
  public setGlobalFeed(articles: Article[]) {
    this.globalFeed = articles;
  }
  @Mutation
  public setProfileFeed(articles: Article[]) {
    this.profilesArticle = articles;
  }
  @Mutation
  public addNewArticle(article: Article) {
    this.profilesArticle.concat(article);
  }
  @Action({commit: 'setGlobalFeed'})
  public async refreshGlobalFeed() {
    const globalFeed = articlesService.getArticles();
    return globalFeed;
  }
  @Action({commit: 'setProfileFeed'})
  public async loadProfileArticle(profileId: object) {
    const profilesArticle = articlesService.getArticles(profileId);
    return profilesArticle;
  }
  @Action({commit: 'addNewArticle'})
  public async insertArticle(newArt: NewArticle) {
    const newArticle = articlesService.insertArticle(newArt);
    return newArticle;
  }

}


export default getModule(ArticlesModule);

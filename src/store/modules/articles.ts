import { VuexModule, Module, getModule, Mutation, Action, MutationAction} from 'vuex-module-decorators';
import store from '../store';
import { Article, NewArticle, Profile } from '../models';
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
  public singleArticle: Article = {
    _id: '',
    title: '',
    description: '',
    body: '',
    tagList: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    favorited: false,
    favoritesCount: 0,
    author_id:  '',
    author: {
      _id:  '',
      username:  '',
      bio:  '',
      image:  '',
      following: false,
    },
    comments: [],
  };
  // public singleArticle: Article = {};

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
    this.globalFeed.concat(article);
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

  @MutationAction
  public async loadSingleArticle(articleId: object) {
    const singleArticle = await articlesService.getArticles(articleId);
    return { singleArticle };
  }

}

export default getModule(ArticlesModule);

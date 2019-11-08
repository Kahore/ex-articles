import { VuexModule, Module, getModule, Mutation, Action, MutationAction} from 'vuex-module-decorators';
import store from '../store';
import { Article, NewArticle, Profile, NewComment, Comment } from '../models';
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
  public comments: Comment[] = [];
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
      following: [],
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
    this.globalFeed.unshift(article);
  }
  @Mutation
  public addNewComment(comment: Comment) {
    this.comments.unshift(comment);
  }

  @Action({commit: 'setGlobalFeed'})
  public async refreshGlobalFeed(filter?: object) {
    const globalFeed = articlesService.getArticles(filter);
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
    const singleArticle = await articlesService.getSingleArticle(articleId);
    return { singleArticle };
  }
  @Action({commit: 'addNewComment'})
  public async insertComment(newCom: NewComment) {
    const newComment = await articlesService.insertComment(newCom);
    return newComment.data;
  }
  @MutationAction
  public async loadComments(articleId: string) {
    const comments = await articlesService.loadComments(articleId);
    return comments.data;
  }
}

export default getModule(ArticlesModule);

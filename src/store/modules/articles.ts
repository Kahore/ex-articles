import { VuexModule, Module, getModule, Mutation, Action, MutationAction} from 'vuex-module-decorators';
import store from '../store';
import { Article, NewArticle, NewComment, Comment, FavoriteTogglerMutation, UpdateArticle } from '../models';
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

  @Mutation
  public setGlobalFeed(articles: Article[]) {
    this.globalFeed = articles;
  }

  @Mutation
  public addNewArticle(article: Article) {
    this.globalFeed.unshift(article);
  }

  @Mutation
  public addUpdatedArticle(article: Article) {
    const index = this.globalFeed.findIndex( (block) => block._id === article._id );
    this.globalFeed.splice(index, 1);
    this.globalFeed = this.globalFeed.concat(article);
  }
  @Mutation
  public addNewComment(comment: Comment) {
    this.comments.unshift(comment);
  }
  @Mutation
  public changeFavoriteCount(mutationData: FavoriteTogglerMutation) {
    const idx = this.globalFeed.findIndex( ( block ) => {
      return block._id === mutationData.articleId;
    });
    if (mutationData.mode === 'add') {
      this.singleArticle.favoritesCount = this.singleArticle.favoritesCount + 1;
      this.globalFeed[idx].favoritesCount = this.globalFeed[idx].favoritesCount + 1;
    } else {
      this.singleArticle.favoritesCount = this.singleArticle.favoritesCount - 1;
      this.globalFeed[idx].favoritesCount = this.globalFeed[idx].favoritesCount - 1;
    }
  }

  @Action({commit: 'setGlobalFeed'})
  public async refreshGlobalFeed(filter?: object) {
    const globalFeed = articlesService.getArticles(filter);
    return globalFeed;
  }

  @Action({commit: 'addNewArticle'})
  public async insertArticle(newArt: NewArticle) {
    const newArticle = articlesService.insertArticle(newArt);
    return newArticle;
  }
  @Action({commit: 'addUpdatedArticle'})
  public async updateArticle(updArt: UpdateArticle) {
    const updatedArticle = articlesService.updateArticle(updArt);
    return updatedArticle;
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
  public async loadProfileArticle(profileId: object) {
    const globalFeed = await articlesService.getArticles(profileId);
    return { globalFeed };
  }

  @MutationAction
  public async loadComments(articleId: string) {
    const comments = await articlesService.loadComments(articleId);
    return comments.data;
  }
}

export default getModule(ArticlesModule);

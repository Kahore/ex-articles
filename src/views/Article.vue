<template>
  <div
    class="article-page"
    :class="{ 'article-page--loading': isLoading }">

    <div class="banner">
      <div class="container">

        <h1>{{ article.title }}</h1>

        <div class="article-meta">
          <a href=""><img :src="article.author.image" /></a>
          <div class="info">
          <router-link :to="'/@'+article.author._id">
            {{ article.author.username }}
          </router-link>
            <span class="date">{{reformat(article.createdAt)}}</span>
          </div>
          <button
            v-if="!isMyProfile"
            class="btn btn-sm btn-outline-secondary">
            <i class="ion-plus-round"></i>
            &nbsp;
            Follow {{ article.author.username }}
          </button>
          &nbsp;&nbsp;
          <button class="btn btn-sm btn-outline-primary">
            <i class="ion-heart"></i>
            &nbsp;
            Favorite Post <span class="counter">{{ article.author.favoritesCount }}</span>
          </button>
        </div>

      </div>
    </div>

    <div class="container page">

      <div class="row article-content">
        <div class="col-md-12">
          <p>
          {{ article.description }}
          </p>
          {{ article.body }}
        </div>
      </div>

      <hr />

      <div class="row">

        <div class="col-xs-12 col-md-8 offset-md-2">

          <form class="card comment-form">
            <div class="card-block">
              <textarea class="form-control" placeholder="Write a comment..." rows="3"></textarea>
            </div>
            <div class="card-footer">
              <img :src="article.author.image" class="comment-author-img" />
              <button class="btn btn-sm btn-primary">
              Post Comment
              </button>
            </div>
          </form>
          
          <ArticleComment
          v-for="comment in article.comments"
          :key="comment._id"
          :comment="comment"/>
          
        </div>

      </div>

    </div>

  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import articles from '../store/modules/articles';
import users from '../store/modules/users';
import { Article } from '../store/models';
import dateReformater from '@/mixins/dateReformater';
@Component({
  mixins: [dateReformater],
  components : {
    ArticleComment: () => import('../components/ArticleComment.vue'),
  },
})
export default class ArticlePage extends Vue {
  public article: Article = {
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
  private isLoading: boolean = false;

  public created() {
    this.isLoading = true;
    const params = {_id: this.$route.params.articleId};
    articles.loadSingleArticle(params).then(() => {
      this.article = articles.singleArticle;
      this.isLoading = false;
    });
  }
  get profile() {
    return users.profile;
  }
  get userId() {
    return users.userId;
  }
  get isMyProfile() {
    if (this.profile && this.userId === this.profile._id) {
      return true;
    }
    return false;
  }
}
</script>

<style scoped>
.article-page--loading {
  opacity: 0.1;
}
</style>
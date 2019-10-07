<template>
  <div
    class="article-page"
    :class="{ 'article-page--loading': isLoading }">

    <div class="banner">
      <div class="container">

        <h1>{{ article.title }}</h1>

        <div class="article-meta">
          <a href=""><img src="http://i.imgur.com/Qr71crq.jpg" /></a>
          <div class="info">
            <a href="" class="author">{{ article.author.username }}</a>
            <span class="date">January 20th</span>
          </div>
          <button class="btn btn-sm btn-outline-secondary">
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
              <img src="http://i.imgur.com/Qr71crq.jpg" class="comment-author-img" />
              <button class="btn btn-sm btn-primary">
              Post Comment
              </button>
            </div>
          </form>
          
          <div class="card">
            <div class="card-block">
              <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
            </div>
            <div class="card-footer">
              <a href="" class="comment-author">
                <img src="http://i.imgur.com/Qr71crq.jpg" class="comment-author-img" />
              </a>
              &nbsp;
              <a href="" class="comment-author">Jacob Schmidt</a>
              <span class="date-posted">Dec 29th</span>
            </div>
          </div>

          <div class="card">
            <div class="card-block">
              <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
            </div>
            <div class="card-footer">
              <a href="" class="comment-author">
                <img src="http://i.imgur.com/Qr71crq.jpg" class="comment-author-img" />
              </a>
              &nbsp;
              <a href="" class="comment-author">Jacob Schmidt</a>
              <span class="date-posted">Dec 29th</span>
              <span class="mod-options">
                <i class="ion-edit"></i>
                <i class="ion-trash-a"></i>
              </span>
            </div>
          </div>
          
        </div>

      </div>

    </div>

  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import articles from '../store/modules/articles';
import { Article } from '../store/models';
@Component
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
}
</script>

<style scoped>
.article-page--loading {
  opacity: 0.1;
}
</style>
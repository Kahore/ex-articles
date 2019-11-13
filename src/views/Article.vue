<template>
  <div class="article-page" :class="{ 'article-page--loading': isLoading }">
    <div class="banner">
      <div class="container">
        <h1>{{ article.title }}</h1>

        <div class="article-meta">
          <a href=""><img :src="article.author.image"/></a>
          <div class="info">
            <router-link :to="'/@' + article.author._id">
              {{ article.author.username }}
            </router-link>
            <span class="date">{{ reformat(article.createdAt) }}</span>
          </div>
          <Follow v-if="canIAction" :profileId="article.author._id" />
          &nbsp;&nbsp;

          <Favorite
            v-if="canIAction"
            :articleId="article._id"
            :counter="article.favoritesCount"
          />

          &nbsp;&nbsp;

          <router-link v-if="canIEdit" :to="'/editor/' + article._id">
            <button class="btn btn-sm btn-outline-secondary">Edit</button>
          </router-link>
          &nbsp;&nbsp;
          <button
            v-if="canIEdit"
            class="btn btn-sm btn-outline-danger"
            @click.prevent="deleteArticle"
          >
            Delete
          </button>
        </div>
      </div>
    </div>

    <div class="container page">
      <article class="row article-content">
        <div class="col-md-12">
          <p>
            {{ article.description }}
          </p>
          <p v-for="(line, index) in article.body.split('\n')" :key="index">
            {{ line }}
          </p>
        </div>
      </article>

      <hr />

      <div class="row">
        <div class="col-xs-12 col-md-8 offset-md-2">
          <form class="card comment-form">
            <template v-if="canIAction">
              <div class="card-block">
                <textarea
                  class="form-control"
                  placeholder="Write a comment..."
                  rows="3"
                  v-model="newCommentBody"
                ></textarea>
              </div>
              <div class="card-footer">
                <img :src="user.image" class="comment-author-img" />
                <button
                  class="btn btn-sm btn-primary"
                  @click.prevent="commentPost()"
                >
                  Post Comment
                </button>
              </div>
            </template>
            <template v-else>
              <div class="card-footer">
                Please, login to post a comment
              </div>
            </template>
          </form>

          <ArticleComment
            v-for="comment in comments"
            :key="comment._id"
            :comment="comment"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import articles from '../store/modules/articles';
import users from '../store/modules/users';
import { Article, Comment, DeleteArticle } from '../store/models';
import DateReformater from '@/mixins/DateReformater.vue';

@Component({
  mixins: [DateReformater],
  components: {
    ArticleComment: () => import('@/components/ArticleComment.vue'),
    Follow: () => import('@/components/Follow.vue'),
    Favorite: () => import('@/components/Favorite.vue'),
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
    author_id: '',
    author: {
      _id: '',
      username: '',
      bio: '',
      image: '',
      following: [],
    },
    comments: [],
  };
  public comments: Comment[] = [];
  public newCommentBody: string = '';
  private isLoading: boolean = false;

  public created() {
    this.isLoading = true;
    const params = { _id: this.$route.params.articleId };
    articles.loadSingleArticle(params).then(() => {
      this.article = articles.singleArticle;
      this.isLoading = false;
    });
    articles.loadComments(this.$route.params.articleId).then(() => {
      this.comments = articles.comments;
    });
  }
  /**
   * deleteArticle
   */
  public deleteArticle() {
    const data: DeleteArticle = {
      articleId: this.article._id,
      userId: this.userId,
    };
    articles.deleteArticle(data).then(() => {
      this.$router.push('/');
    });
  }
  get user() {
    return users.user;
  }
  get userId() {
    return users.userId;
  }
  get canIEdit(): boolean {
    if (this.user && this.userId === this.article.author._id) {
      return true;
    }
    return false;
  }

  get canIAction(): boolean {
    if (this.user) {
      return true;
    }
    return false;
  }

  /**
   * commentPost
   */
  public commentPost() {
    const data = {
      body: this.newCommentBody,
      author_id: this.userId,
      article_id: this.$route.params.articleId,
    };
    articles.insertComment(data).then(() => {
      this.newCommentBody = '';
    });
  }
}
</script>

<style scoped>
.article-page--loading {
  opacity: 0.1;
}
</style>

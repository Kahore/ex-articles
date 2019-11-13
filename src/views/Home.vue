<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">Logo name</h1>
        <p>Some brand phrase here.</p>
      </div>
    </div>
    <!-- .banner -->
    <div class="container page">
      <div class="row">
        <div class="col-md-9 col-xs-12">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <router-link
                  v-if="userId"
                  class="nav-link"
                  :class="{ active: currentTab === 'user' }"
                  to="/"
                >
                  <div @click.prevent="filterArticleByPersonal()">
                    Your Feed
                  </div>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link
                  class="nav-link"
                  :class="{ active: currentTab === 'global' }"
                  to="/"
                >
                  <div @click.prevent="filterArticleByGlobal()">
                    Global Feed
                  </div>
                </router-link>
              </li>
            </ul>
          </div>
          <!-- .feed-toggle -->

          <ArticlePreview
            v-for="article in feed"
            :article="article"
            :key="article._id"
          >
          </ArticlePreview>
          <div class="col-md-11 col-xs-11 offset-md-1">
            <p v-if="feed.length === 0 && !isLoading">
              Look's like there is nothing here to show :(
            </p>
          </div>
        </div>

        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>
            <div class="tag-list">
              <a
                href=""
                class="tag-pill tag-default"
                v-for="(tag, index) in tags"
                :key="index"
                @click.prevent="filterArticleByTag(tag)"
                >{{ tag }}
              </a>
            </div>
          </div>
        </div>
      </div>
      <!-- .row -->
    </div>
    <!-- .container page-->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import articles from '../store/modules/articles';
import tags from '../store/modules/tags';
import { Article } from '../store/models';
import users from '../store/modules/users';
@Component({
  components: {
    ArticlePreview: () => import('../components/ArticlePreview.vue'),
  },
})
export default class Home extends Vue {
  public feed: Article[] = [];
  public tags: string[] = [];
  private currentTab: 'global' | 'user' = 'global';
  private isLoading: boolean = false;
  public created() {
    this.setArticle();
    tags.getTags().then(() => {
      this.tags = tags.tagList;
    });
  }
  /**
   * filterArticleByTag
   */
  public filterArticleByTag(tag: string) {
    let tagFilter: object = { tag };
    if (this.currentTab === 'user') {
      tagFilter = { ...tagFilter, userFeed: this.userId };
    }
    this.setArticle(tagFilter);
  }
  /**
   * filterArticleByPersonal
   */
  public filterArticleByPersonal() {
    this.currentTab = 'user';
    const userFeed = { userFeed: this.userId };
    this.setArticle(userFeed);
  }
  public filterArticleByGlobal() {
    this.currentTab = 'global';
    this.setArticle();
  }
  private setArticle(filter?: object): void {
    this.feed = [];
    this.isLoading = true;
    articles.refreshGlobalFeed(filter).then(() => {
      this.isLoading = false;
      this.feed = articles.globalFeed;
    });
  }
  get userId() {
    return users.userId;
  }
}
</script>

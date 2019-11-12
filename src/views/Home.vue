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
                <a
                  class="nav-link disabled"
                  href="">Your Feed</a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link active"
                  href="">Global Feed</a>
              </li>
            </ul>
          </div>
          <!-- .feed-toggle -->

          <ArticlePreview
            v-for="article in feed"
            :article="article"
            :key="article._id">
          </ArticlePreview>
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
                @click.prevent="filterArticleByTag(tag)">{{tag}}
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
@Component({
  components: {
    ArticlePreview: () => import('../components/ArticlePreview.vue'),
  },
})
export default class Home extends Vue {
  public feed: Article[] = [];
  public tags: string[] = [];

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
    this.setArticle(tag);
  }
  private setArticle(filter?: string): void {
    const tagFilter = {tag: filter};
    articles.refreshGlobalFeed(tagFilter).then(() => {
      this.feed = articles.globalFeed;
    });
  }
}
</script>

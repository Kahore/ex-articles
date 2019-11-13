<template>
  <div class="article-preview">
    <div class="article-meta">
      <a :href="'/@' + article.author._id"
        ><img :src="article.author.image"
      /></a>
      <div class="info">
        <router-link :to="'/@' + article.author._id">
          {{ article.author.username }}
        </router-link>
        <span class="date">{{ reformat(article.createdAt) }}</span>
      </div>
      <div class="pull-xs-right">
        <Favorite :articleId="article._id" :counter="article.favoritesCount" />
      </div>
    </div>

    <router-link class="preview-link" :to="'/article/' + article._id">
      <h1>{{ article.title }}</h1>
      <p>{{ article.description }}</p>
      <span>Read more...</span>
    </router-link>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Article } from '../store/models';
import DateReformater from '@/mixins/DateReformater.vue';
@Component({
  mixins: [DateReformater],
  components: {
    Favorite: () => import('@/components/Favorite.vue'),
  },
})
export default class ArticlePreview extends Vue {
  @Prop() public article?: Article;
}
</script>

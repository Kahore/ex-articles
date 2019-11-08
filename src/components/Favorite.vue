<template>
  <button
    class="btn btn-sm btn-outline-primary"
    @click="favoriteToggler(articleId, isFavorite(articleId) ? 'delete':'add' )">
    <i class="ion-heart"></i>
      <template v-if="isFavorite(articleId)">
        Unfavorite
      </template>
      <template v-else>
        Favorite
      </template>
      <span class="counter">{{ counter }}</span>
  </button>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import users from '../store/modules/users';
import { FavoriteToggler } from '../store/models';
import articles from '../store/modules/articles';
@Component
export default class Favorite extends Vue {

  get user() {
    return users.user;
  }
  get userId() {
    return users.userId;
  }

  @Prop({required: true, default: ''}) private articleId!: string;
  @Prop({required: true, default: 0}) private counter!: number;
  /**
   * isFavorite
   */
   public isFavorite(articleId: string): boolean {
    // TODO: Find a way to fix this
    // @ts-ignore
    if (this.user && this.user!.favorites.indexOf(this.articleId) !== -1) {
      return true;
    }
    return false;
  }
  /**
   * favoriteToggler
   */
  public favoriteToggler(profileId: string, mode: 'add' | 'delete') {
    const payload: FavoriteToggler = {
      articleId: this.articleId,
      userId: this.userId,
      mode,
    };
    users.favoriteToggler(payload).then( () => {
      const mutationData = {
        articleId: this.articleId,
        mode,
      };
      articles.changeFavoriteCount(mutationData);
    });
  }
}
</script>

<template>
  <div class="card">
    <div class="card-block">
      <p class="card-text">{{comment.body}}</p>
    </div>
    <div class="card-footer">
      <router-link :to="'/@'+comment.author._id">
        <img :src="comment.author.image" class="comment-author-img" />
      </router-link>
      &nbsp;
          <router-link :to="'/@'+comment.author._id">
            {{ comment.author.username }}
          </router-link>
      <span class="date-posted">{{reformat(comment.createdAt)}}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Comment } from '../store/models';
import dateReformater from '@/mixins/dateReformater';
@Component({
  mixins: [dateReformater],
})
export default class ArticleComment extends Vue {
  @Prop() public comment?: Comment;
}
</script>

<template>
  <div class="profile-page">

    <div class="user-info">
      <div class="container">
        <div class="row">

          <div class="col-xs-12 col-md-10 offset-md-1">
            <img :src="profile.image" class="user-img" />
            <h4>{{profile.username}}</h4>
            <p v-if="profile.bio">
              {{ profile.bio}}
            </p>
          <Follow :profileId="profile._id"/>
          </div>

        </div>
        <!-- .row -->
      </div>
    </div>

    <div class="container">
      <div class="row">

        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <a class="nav-link active" href="">
                  <template v-if="isMyProfile">
                    My Articles 
                  </template>
                  <template v-else>
                    {{profile.username}}'s Articles 
                  </template>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="">Favorited Articles</a>
              </li>
            </ul>
          </div>

          <ArticlePreview
            v-for="article in profileArticle"
            :article="article"
            :key="article._id">
          </ArticlePreview>
        </div>

      </div>
    </div>

  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import users from '../store/modules/users';
import articles from '../store/modules/articles';
import { Article } from '../store/models';
@Component({
  components: {
    ArticlePreview: () => import('../components/ArticlePreview.vue'),
    Follow: () => import('../components/Follow.vue'),
  },
})
export default class Profile extends Vue {
  public profileArticle: Article[] = [];
  public created() {
    const payload = {
      profileId: this.$route.params.id,
      userId: this.userId,
    };
    users.loadProfile(payload);
    this.articleLoader();
  }


  private articleLoader() {
    articles.loadProfileArticle({author_id: this.$route.params.id}).then(() => {
      this.profileArticle = articles.globalFeed;
    });
  }
  get profile() {
    return users.profile;
  }
  get user() {
    return users.user;
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

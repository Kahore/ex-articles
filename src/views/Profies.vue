<template>
  <div v-if="profile" class="profile-page">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img :src="profile.image" @error="imgUrlAlt" class="user-img" />
            <h4>{{ profile.username }}</h4>
            <p v-if="profile.bio">
              {{ profile.bio }}
            </p>
            <Follow :profileId="profile._id" />
          </div>
        </div>
        <!-- .row -->
      </div>
      <!-- .container -->
    </div>
    <!-- .user-info -->
    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <keep-alive>
                  <router-link
                    class="nav-link"
                    :class="{ active: currentTab === 'profile' }"
                    :to="'/@' + profile._id"
                  >
                    <div @click="getProfilesArticle()">
                      <template v-if="isMyProfile">
                        My Articles
                      </template>
                      <template v-else>
                        {{ profile.username }}'s Articles
                      </template>
                    </div>
                  </router-link>
                </keep-alive>
              </li>
              <li class="nav-item">
                <router-link
                  class="nav-link"
                  :class="{ active: currentTab === 'favorite' }"
                  :to="'/@' + profile._id"
                >
                  <div @click.prevent="getFavoriteArticle()">
                    Favorited Articles
                  </div>
                </router-link>
              </li>
            </ul>
          </div>

          <ArticlePreview
            v-for="article in profileArticle"
            :article="article"
            :key="article._id"
          >
          </ArticlePreview>
        </div>
        <div class="col-md-11 col-xs-11 offset-md-1">
          <p v-if="profileArticle.length === 0 && !isLoading">
            Look's like there is nothing here to show :(
          </p>
        </div>
      </div>
      <!-- .row -->
    </div>
    <!-- .container -->
  </div>
  <!-- .profile-page -->
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import users from '../store/modules/users';
import articles from '../store/modules/articles';
import { Article, ProfileFilter } from '../store/models';
import IsMyProfile from '@/mixins/IsMyProfile.vue';
@Component({
  mixins: [IsMyProfile],
  components: {
    ArticlePreview: () => import('../components/ArticlePreview.vue'),
    Follow: () => import('../components/Follow.vue'),
  },
})
export default class Profile extends Vue {
  public profileArticle: Article[] = [];
  private currentTab: 'profile' | 'favorite' = 'profile';
  private isLoading: boolean = false;
  public created() {
    const payload = {
      profileId: this.$route.params.id,
      userId: this.userId,
    };
    users.loadProfile(payload);
    this.getProfilesArticle();
  }
  /**
   * beforeDestroy
   */
  public beforeDestroy() {
    users.resetProfile();
  }
  public getProfilesArticle() {
    this.currentTab = 'profile';
    const filter: ProfileFilter = { author_id: this.$route.params.id };
    this.articleLoader(filter);
  }
  /**
   * getFavoriteArticle
   */
  public async getFavoriteArticle() {
    this.isLoading = true;
    this.currentTab = 'favorite';
    const filter: ProfileFilter = {
      author_id: this.$route.params.id,
      favorited: this.user._id,
    };
    this.articleLoader(filter);
  }
  private async articleLoader(filter: ProfileFilter) {
    this.isLoading = true;
    this.profileArticle = [];
    await articles.loadProfileArticle(filter).then(() => {
      this.profileArticle = articles.globalFeed;
      this.isLoading = false;
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
  // get isMyProfile() {
  //   if (this.profile && this.userId === this.profile._id) {
  //     return true;
  //   }
  //   return false;
  // }
  private imgUrlAlt(event: any) {
    this.profile!.image = '';
  }
}
</script>

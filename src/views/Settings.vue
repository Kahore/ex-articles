<template>
  <div class="settings-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Your Settings</h1>
          <form>
            <fieldset>
                <fieldset class="form-group">
                  <input
                    class="form-control"
                    type="text" placeholder="URL of profile picture"
                    v-model="user.image">
                </fieldset>
                <fieldset class="form-group">
                  <input
                    class="form-control form-control-lg"
                    type="text"
                    placeholder="Your Name"
                    v-model="user.username">
                </fieldset>
                <fieldset class="form-group">
                  <textarea
                    class="form-control form-control-lg"
                    rows="8"
                    placeholder="Short bio about you"
                    v-model="user.bio"></textarea>
                </fieldset>
                <fieldset class="form-group">
                  <input
                    class="form-control form-control-lg"
                    type="text"
                    placeholder="Email"
                    v-model="user.email">
                </fieldset>
                <fieldset class="form-group">
                  <input class="form-control form-control-lg" type="password" placeholder="Password">
                </fieldset>
                <button
                  class="btn btn-lg btn-primary pull-xs-right"
                  :disabled="isLoading"
                  @click.prevent="updateSettings">
                  Update Settings
                </button>
            </fieldset>
          </form>
        </div>
      </div>
      <!-- .row -->
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { User } from '../store/models';
import users from '../store/modules/users';
@Component
export default class Settings extends Vue {
  public user: User  = {
    _id: '',
     email: '',
     username: '',
     bio: '',
     image: '',
     following: [],
  };
  private isLoading: boolean = false;
  /**
   * updateSettings
   */
  public updateSettings() {
    this.isLoading = true;
    users.updateUser(this.user).then(() => {
      this.isLoading = false;
    });
  }
  public created() {
    this.user = users.user;
  }
}
</script>

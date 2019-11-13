<template>
  <button
    v-if="!isMyProfile"
    class="btn btn-sm btn-outline-secondary action-btn"
    @click="followToggler(profileId, isFollow(profileId) ? 'delete' : 'add')"
  >
    <i class="ion-plus-round"></i>
    <template v-if="isFollow(profileId)">
      Unfollow
    </template>
    <template v-else>
      Follow
    </template>
  </button>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import users from '../store/modules/users';
import { FollowToggler } from '../store/models';
@Component
export default class Follow extends Vue {
  @Prop({ required: true, default: '' })
  private profileId!: string;
  get user() {
    return users.user;
  }
  get userId() {
    return users.userId;
  }
  get isMyProfile() {
    if (this.userId === this.profileId) {
      return true;
    }
    return false;
  }
  /**
   * followToggler
   */
  public followToggler(profileId: string, mode: string) {
    const payload: FollowToggler = {
      profileId: this.profileId,
      userId: this.userId,
      mode,
    };
    users.followToggler(payload);
  }
  /**
   * isFollow
   */
  public isFollow(profileId: string) {
    // TODO: Find a way to fix this
    // @ts-ignore
    if (this.user && this.user!.following.indexOf(profileId) !== -1) {
      return true;
    }
    return false;
  }
}
</script>

<style scoped></style>

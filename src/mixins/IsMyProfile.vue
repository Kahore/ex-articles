<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import users from '../store/modules/users';
@Component({})
export default class IsMyProfileMixin extends Vue {
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

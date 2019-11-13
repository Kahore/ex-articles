<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign up</h1>
          <p class="text-xs-center">
            <router-link to="/login">
              Have an account?
            </router-link>
            <a href=""></a>
          </p>

          <ul class="error-messages" v-if="error">
            <li>That email is already taken</li>
          </ul>

          <form>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="text"
                placeholder="Your Name"
                v-model="newUser.username"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="text"
                placeholder="Email"
                v-model="newUser.email"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="password"
                placeholder="Password"
                v-model="newUser.password"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="password"
                placeholder="Repeat password"
                v-model="repeatPassword"
              />
            </fieldset>
            <button
              class="btn btn-lg btn-primary pull-xs-right"
              @click.prevent="registerUser"
            >
              Sign up
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import users from '../store/modules/users';
import { User, NewUser } from '../store/models';

@Component
export default class Register extends Vue {
  private error: string = '';
  private newUser: NewUser = {
    username: '',
    email: '',
    password: '',
  };
  private repeatPassword: string = '';
  /**
   * registerUser
   */
  public registerUser() {
    users
      .register(this.newUser)
      .then(() => {
        this.$router.push('/');
        this._resetRegisterForm();
      })
      .catch((err) => {
        this.error = 'Invalid username or password';
      });
  }
  private _resetRegisterForm(): void {
    this.newUser = {
      username: '',
      email: '',
      password: '',
    };
  }
}
</script>

<style scoped></style>

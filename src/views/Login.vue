<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">

        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign up</h1>
          <p class="text-xs-center">
            <a href="">Have an account?</a>
          </p>

          <ul class="error-messages" v-if="error">
            <li>That email is already taken</li>
          </ul>

          <form>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="text"
                placeholder="Email"
                v-model="email">
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg" 
                type="password"
                placeholder="Password"
                v-model="password">
            </fieldset>
            <button
              class="btn btn-lg btn-primary pull-xs-right"
              @click.prevent="login">
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

@Component
export default class Login extends Vue {
  public email: string = '';
  public password: string = '';
  public error: string = '';

  public login() {
    users
    .login({
      email: this.email,
      password: this.password,
    })
    .then(() => this.$router.push('/'))
    .catch((err) => {
      this.error = 'Invalid username or password';
    });
  }
}
</script>


<style scoped>

</style>
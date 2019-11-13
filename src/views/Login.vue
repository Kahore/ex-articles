<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign up</h1>
          <p class="text-xs-center">
            <router-link to="/register">
              New here? Let's started!
            </router-link>
          </p>

          <ul class="error-messages" v-if="errorMsg">
            <li>{{ errorMsg }}</li>
          </ul>

          <form>
            <fieldset
              class="form-group"
              :class="{ 'form-group--error': $v.email.$error }"
            >
              <input
                class="form-control form-control-lg"
                type="text"
                placeholder="Email"
                v-model="email"
              />
              <div class="form-group__message--error" v-if="!$v.email.required">
                Email is required
              </div>
            </fieldset>
            <fieldset
              class="form-group"
              :class="{ 'form-group--error': $v.password.$error }"
            >
              <input
                class="form-control form-control-lg"
                type="password"
                placeholder="Password"
                v-model="password"
              />
              <div
                class="form-group__message--error"
                v-if="!$v.password.required"
              >
                Password is required
              </div>
            </fieldset>
            <button
              class="btn btn-lg btn-primary pull-xs-right"
              @click.prevent="login"
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
import { required } from 'vuelidate/lib/validators';
@Component
export default class Login extends Vue {
  public email: string = '';
  public password: string = '';
  public error: string = '';

  public async login() {
    // @ts-ignore
    this.$v.$touch();
    // @ts-ignore
    if (!this.$v.$invalid) {
      users.setError('');
      await users.login({
        email: this.email,
        password: this.password,
      });
      if (this.errorMsg === '') {
        this.$router.push('/');
      }
    }
  }
  get errorMsg() {
    return users.getErrorMsg;
  }
  private validations() {
    return {
      email: {
        required,
      },
      password: {
        required,
      },
    };
  }
}
</script>

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
            <fieldset
              class="form-group"
              :class="{ 'form-group--error': $v.newUser.username.$error }"
            >
              <input
                class="form-control form-control-lg"
                type="text"
                placeholder="Your Name"
                v-model="newUser.username"
              />
              <div
                class="form-group__message--error"
                v-if="!$v.newUser.username.required"
              >
                Username is required.
              </div>
              <div
                class="form-group__message--error"
                v-if="!$v.newUser.username.minLength"
              >
                Username must have at least
                {{ $v.newUser.username.$params.minLength.min }} letters.
              </div>
            </fieldset>
            <fieldset
              class="form-group"
              :class="{ 'form-group--error': $v.newUser.email.$error }"
            >
              <input
                class="form-control form-control-lg"
                type="text"
                placeholder="Email"
                v-model="newUser.email"
              />
              <div
                class="form-group__message--error"
                v-if="!$v.newUser.email.required"
              >
                Email is required.
              </div>
              <div
                class="form-group__message--error"
                v-if="!$v.newUser.email.email"
              >
                Please, type a valid email.
              </div>
            </fieldset>
            <fieldset
              class="form-group"
              :class="{ 'form-group--error': $v.newUser.password.$error }"
            >
              <input
                class="form-control form-control-lg"
                type="password"
                placeholder="Password"
                v-model="newUser.password"
              />
              <div
                class="form-group__message--error"
                v-if="!$v.newUser.password.required"
              >
                Password is required.
              </div>
              <div
                class="form-group__message--error"
                v-if="!$v.newUser.password.minLength"
              >
                Password must have at least
                {{ $v.newUser.password.$params.minLength.min }} letters.
              </div>
            </fieldset>
            <fieldset
              class="form-group"
              :class="{ 'form-group--error': $v.newUser.repeatPassword.$error }"
            >
              <input
                class="form-control form-control-lg"
                type="password"
                placeholder="Repeat password"
                v-model="repeatPassword"
              />
              <div
                class="form-group__message--error"
                v-if="!$v.newUser.repeatPassword.sameAs"
              >
                Passwords must be identical.
              </div>
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
import { required, sameAs, minLength, email } from 'vuelidate/lib/validators';
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
    // @ts-ignore
    this.$v.$touch();
    // @ts-ignore
    if (!this.$v.$invalid) {
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
  }
  private validations() {
    return {
      newUser: {
        username: {
          required,
          minLength: minLength(3),
        },
        email: {
          required,
          email,
        },
        password: {
          required,
          minLength: minLength(6),
        },
        repeatPassword: {
          sameAs: sameAs('password'),
        },
      },
    };
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

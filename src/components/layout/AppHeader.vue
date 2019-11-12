<template>
  <nav class="navbar navbar-light navbar-expand-sm">
    <div class="container ">
      <a
        class="navbar-brand"
        href="/">
        Logo name
      </a>
      <ul class="nav navbar-nav pull-xs-right">
        <li class="nav-item">
          <router-link
            class="nav-link"
            to="/">
            Home
          </router-link>
        </li>
        <li v-if="username" class="nav-item">
          <router-link
            class="nav-link"
            to="/editor">
            New Article
          </router-link>
        </li>
        <li
          v-if="username"
          class="nav-item">
          <router-link
            class="nav-link"
            to="/settings">
            Settings
          </router-link>
        </li>
        <li v-if="username" class="nav-item">
          <router-link
            class="nav-link"
            :to="'/@' + userId">
            {{ username }}
          </router-link>
        </li>
        <li v-if="username" class="nav-item" >
          <a
            href=""
            class="nav-link"
            @click.prevent="logout">
            Log out
          </a>
        </li>
        <li v-if="!username" class="nav-item">
          <router-link
            class="nav-link"
            to="/register">
            Sign up
          </router-link>
        </li>
        <li
          v-if="!username"
          class="nav-item">
          <router-link
            link class="nav-link"
            to="/login">
            Sign in
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import users from '../../store/modules/users';


@Component
export default class AppHeader extends Vue {
  get username() {
    return users.username;
  }
  get userId() {
    return users.userId;
  }
  public logout() {
    users.logOut();
    this.$router.push('/');
  }
}
</script>

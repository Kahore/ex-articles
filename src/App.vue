<template>
  <div id="app">
    <AppHeader />
    <router-view :key="$route.fullPath" />
    <AppFooter />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import users from './store/modules/users';
@Component({
  components: {
    AppHeader: () => import('./components/layout/AppHeader.vue'),
    AppFooter: () => import('./components/layout/AppFooter.vue'),
  },
})
export default class App extends Vue {
  public created() {
    users.localAuth();
  }
}
</script>

<style>
.form-group--error input,
.form-group--error textarea,
.form-group--error input:focus,
.form-group--error input:hover {
  border-color: #f79483;
}

.form-group__message--error {
  display: none;
}
.form-group--error > .form-group__message--error {
  font-size: 0.75rem;
  display: block;
  color: #f57f6c;
}
</style>

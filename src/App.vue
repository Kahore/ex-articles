<template>
  <div id="app">
    <AppHeader/>
    <router-view :key="$route.fullPath"/>
    <AppFooter/>
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

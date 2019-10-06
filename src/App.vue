<template>
  <div id="app">
    <AppHeader/>
    <router-view/>
    <AppFooter/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {
    AppHeader: () => import('./components/layout/AppHeader'),
    AppFooter: () => import('./components/layout/AppFooter'),
  },
})

export default class App extends Vue {

}
</script>

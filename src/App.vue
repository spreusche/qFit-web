<template>
  <v-app>
    <v-main>
      <Toolbar v-if="isNotHome"/>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

import Toolbar from './components/Toolbar';

export default {
  name: 'App',

  components: {
    Toolbar
  },

  computed: { 
    isNotHome() {
      return this.$route.path != '/'
    }
  },

  data: () => ({
    //
  }),
};
</script>
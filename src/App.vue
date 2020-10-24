<template>
  <v-app>
    <Toolbar v-if="isNotHome && isNotVerif"/>
    <v-main>
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
    },
    isNotVerif(){
      return this.$route.path != '/Verificacion'
    }
  },

  data: () => ({
    //
  }),
};
</script>
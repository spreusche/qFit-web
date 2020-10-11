<template>
  <v-app>
   

    <v-main>
      <Toolbar/>
      <Explorar/>
    </v-main>
  </v-app>
</template>

<script>
import Explorar from './components/Explorar';
import Toolbar from './components/Toolbar';

export default {
  name: 'App',

  components: {
    Explorar,
    Toolbar
  },

  data: () => ({
    //
  }),
};
</script>

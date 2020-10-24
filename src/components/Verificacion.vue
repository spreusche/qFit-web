<template>
    <v-container fluid>

     <v-app-bar color="#2D2D2A" dark fixed app>
    <v-col cols="5">
    </v-col>
      <img
        :src="require('../assets/logo-qfit.png')"
        height="100%"
        fixed
        alt=""
      />

     </v-app-bar>

<div v-if="!error">
    <h1>¡Bienvenido!</h1>
    <h2>Tu cuenta ha sido activada</h2>
       <h3> <a href="http://localhost:8081/" style="color:#00e140"> Haz click aquí para iniciar sesión </a> </h3>
</div>
<div v-else>
   <h2 style="color:red"> Ocurrió un error al verificar tu cuenta. </h2>
    <h2>Intenta usar el código: </h2>
    <h2><span style="color:#00e140"> {{ this.code }} </span> </h2>
</div>

    </v-container>
</template>





<script>
import { UserApi } from '../api/user'

export default {
     data() {
    return {
        code: this.$route.query.code,
        email: this.$route.query.user,
        error: false
    };
  },
    beforeMount: function(){
    console.log(this.email +" --> " + this.code + "--->" + this.$route.path); 

        this.axios.post(UserApi.baseUrl + '/user/verify_email', {email: this.email, code: this.code})
        .catch(e => {
            console.log(e.description);
            this.error = true;
        });

    }
}
</script>
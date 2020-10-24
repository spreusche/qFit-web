<template>
  <div class="bg">
    <v-img>
      <v-container fluid class="fill-height pa-0 ma-0">
        <v-row>
          <v-col>
            <v-row justify="center" align="center" style="height: 550px">
              <v-card rounded color="transparent" elevation="0">
                <v-card-title class="justify-center white--text bienvenido">
                  <h1>¡Bienvenido!</h1>
                </v-card-title>
                <v-card-text>
                  <v-row>
                    <v-text-field
                      label="Usuario"
                      filled
                      background-color="white"
                      rounded
                      dense
                      v-model="username"
                    ></v-text-field>
                  </v-row>
                  <v-row>
                    <v-text-field
                      label="Contraseña"
                      filled
                      rounded
                      dense
                      background-color="white"
                      v-model="password"
                      :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="show1 ? 'text' : 'password'"
                      name="input-10-1"
                      @click:append="show1 = !show1"
                    ></v-text-field>
                  </v-row>

                  <v-row align="center" justify="center" class="mt-2">
                    <template>
                      <v-row justify="center">
                        <v-dialog v-model="dialog" dark max-width="400px">
                          <template v-slot:activator="{ on, attrs }">
                            <v-btn
                              elevation="2"
                              color="#337CA0"
                              dark
                              rounded
                              class="mr-3 caja"
                              v-bind="attrs"
                              v-on="on"
                              >REGISTRARSE</v-btn
                            >
                          </template>
                          <v-card>
                            <v-card-text>
                              <v-row>
                                <v-col cols="12">

                                  <!--Input registro usuario -->
                                  <v-container v-show="!verification">
                                    <v-row>
                                      <v-text-field
                                        label="Usuario *"
                                        v-model="usernameReg"
                                        required
                                        filled
                                        rounded
                                        dense
                                        :rules="[rules.required, rules.minUsername]"
                                      ></v-text-field>
                                    </v-row>

                                    <!--Input registro email -->
                                    <v-row>
                                      <v-text-field
                                        label="Email *"
                                        v-model="emailReg"
                                        required
                                        :rules="[rules.required, rules.email]"
                                        filled
                                        rounded
                                        dense
                                      ></v-text-field>
                                    </v-row>

                                    <!--Input registro contrasena -->
                                    <v-row>
                                      <v-text-field
                                        v-model="passReg"
                                        filled
                                        rounded
                                        dense
                                        required
                                        :append-icon="
                                          show1 ? 'mdi-eye' : 'mdi-eye-off'
                                        "
                                        :type="show1 ? 'text' : 'password'"
                                        :rules="[rules.required, rules.min]"
                                        name="input-10-1"
                                        label="Contraseña *"
                                        hint="Mínimo 8 caracteres"
                                        counter
                                        @click:append="show1 = !show1"
                                      ></v-text-field>
                                    </v-row>
                                    <v-row>
                                      <v-text-field
                                          v-model="confirmPassword"
                                          filled
                                          rounded
                                          dense
                                          required
                                          :append-icon="
                                          show1 ? 'mdi-eye' : 'mdi-eye-off'
                                        "
                                          :type="show1 ? 'text' : 'password'"
                                          :rules="[comparePassword]"
                                          name="input-10-1"
                                          label="Confirmar Contraseña *"
                                          counter
                                          @click:append="show1 = !show1"
                                      ></v-text-field>
                                    </v-row>
                                    <v-row>
                                      <v-btn
                                        block
                                        elevation="2"
                                        color="#00E140"
                                        dark
                                        rounded
                                        class="caja"
                                        @click="register()"
                                        >REGISTRARSE
                                      </v-btn>
                                    </v-row>
                                  </v-container>

                                  <!--Input registro verificacion -->
                                  <v-container v-show="verification">
                                    <v-row>
                                      <h3 class="mb-3">El código de verificación fue enviado a su casilla de correo electrónico.</h3>
                                      <v-text-field
                                        v-model="verificationInput"
                                        filled
                                        rounded
                                        dense
                                        label="Código de Verificación "
                                        hint="Revise su casilla de correo"
                                        @click:append="show1 = !show1"
                                      ></v-text-field>
                                    </v-row>
                                    <v-row>
                                      <v-btn
                                        block
                                        elevation="2"
                                        color="#00E140"
                                        dark
                                        rounded
                                        class="caja"
                                        @click="verifyCode()"
                                        >VERIFICAR CÓDIGO
                                      </v-btn>
                                    </v-row>
                                  </v-container>
                                </v-col>
                              </v-row>
                            </v-card-text>
                          </v-card>
                        </v-dialog>
                        <v-btn
                          elevation="2"
                          color="#00E140"
                          dark
                          rounded
                          class="caja"
                          @click="logIn()"
                          >INICIAR SESIÓN</v-btn
                        >
                      </v-row>
                    </template>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-row>
          </v-col>
        </v-row>
      </v-container></v-img>
    <v-snackbar top :multi-line="multiLine" v-model="snackBar_credencialesIncorrectas">
      Usuario y/o Contraseña incorrecta
    </v-snackbar>
    <v-snackbar top :multi-line="multiLine" v-model="snackBar_faltaVerificacion">
      <h3>Debe activar su cuenta. </h3>
      <p> Revise su casilla de correo electrónico. </p>
      <v-btn color="#00E140" @click="[snackBar_faltaVerificacion = false, snackBar_llenarCorreo = true]">
        Reenviar correo de verificación.
      </v-btn>
    </v-snackbar>
    <v-snackbar top v-model="snackBar_llenarCorreo" timeout="-1" :multi-line="multiLine" :vertical="vertical">
       <h3 class="mb-4" > Recuerde usar el mismo correo con el que se registró. </h3>

      <v-text-field v-model="correoEnSnack" label="Ingrese su correo" filled rounded dense></v-text-field>

      <v-btn right class="mr-5, ml-3"  color="red" @click="snackBar_llenarCorreo = false" width="45%">
        Cancelar
      </v-btn>

      <v-btn right class="ml-4" color="#00E140" @click="[snackBar_llenarCorreo = false, resendEmail()]" width="45%">
        Enviar
      </v-btn>
    </v-snackbar>

    <v-snackbar top color="error" v-model="snackBar_errorReenviar">
      <h2>Ocurrió un error</h2>
      <p> Recuerde usar el mismo correo con el que se registró. </p>
    </v-snackbar>

    <v-snackbar top color="error" v-model="snackBar_usernameTaken"> 
      El nombre de usuario ya existe.
    </v-snackbar>

    <v-snackbar top color="error" v-model="snackBar_emailTaken"> 
      El correo ya existe.
    </v-snackbar>
  </div>

</template>

<style>
.bienvenido {
  text-shadow: 2px 3px 10px #000000;
}
.caja {
  font-weight: bold;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.7);
}
.bg {
  background-image: url("../assets/home-background.png");
  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>

<script>
//import func from '../../vue-temp/vue-editor-bridge'
//import { Api } from '../api/api.js';
//import { UserApi, Credentials } from '../api/user.js';
//import { SportApi, Sport } from '../api/sport.js';
import router from "../router/index";
import { UserApi } from "../api/user";
export default {
  data() {
    return {
      show1: false,
      dialog: false,
      username: "",
      password: "",
      token: "",
      usernameReg: "",
      emailReg: "",
      passReg: "",
      confirmPassword:'',
      verification: false,
      verificationInput: "",

      showMissingEmail: false,
      showMissingUsername: false,
      showMissingPass: false,
      incorrectCode: false,

      snackBar_credencialesIncorrectas: false,
      snackBar_faltaVerificacion: false,
      snackBar_llenarCorreo: false,
      correoEnSnack: '',
      snackBar_errorReenviar: false,
      snackBar_usernameTaken: false,
      snackBar_emailTaken: false,
      


      rules: {
        required: (value) => !!value || "Obligatorio",
        min: (v) => v.length >= 8 || "Mínimo 8 caracteres",
        minUsername:(v) => v.length >=1 || "Ingrese un nombre de usuario",
        email: value => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(value) || 'Correo inválido.'
          },
      },
    };
  },
  methods: {
    logIn: function () {
      this.axios
        .post(UserApi.baseUrl + "/user/login", {
          username: this.username,
          password: this.password,
        })
        .then(response => {
          localStorage.setItem("token",response.data.token);
          UserApi.token = response.data.token;
          this.axios.defaults.headers.common[
            "Authorization"
          ] = `bearer ${localStorage.getItem("token")}`;
          // router.go(1);
          router.push({ name: "Explorar" });
        })
        .catch(error => {
          if(error.response.data.code == 4){
            this.snackBar_credencialesIncorrectas = true;
          }else if(error.response.data.code == 8){
             this.snackBar_faltaVerificacion = true;
          }
            this.snackBar_llenarCorreo = false;
        });
    },

    resendEmail: function(){
      this.axios.post(UserApi.baseUrl + "/user/resend_verification", {
        email: this.correoEnSnack
      }).catch(() => this.snackBar_errorReenviar = true);
    },

    register: function () {
      var cont = 1;
      this.snackBar_usernameTaken = false;
      this.snackBar_emailTaken = false;

      if (this.usernameReg === "") {
        this.showMissingUsername = true;
        console.log("user vacio");
        cont = 0;
      }

      if (this.passReg === "" || this.passReg.length < 8) {
        this.showMissingPass = true;
        console.log("pass vacio o inc");
        cont = 0;
      }

      if (this.emailReg === "") {
        this.showMissingEmail = true;
        console.log("email vacio");
        cont = 0;
      }
      //los campos restantes se llenan con "basura", luego dentro de la Web algunos campos podrian modificarse
      //y otros no, de todas formas, si no se utilizan no cambia
      if (cont) {
        this.axios
          .post(UserApi.baseUrl + "/user", {
            username: this.usernameReg,
            password: this.passReg,
            fullName: "sin definir",
            gender: "male",
            birthdate: 0,
            email: this.emailReg,
            phone: "0000-0000",
            avatarUrl: " ",
          })
          .then(() => {
            this.showMissingUsername = false;
            this.showMissingPass = false;
            this.showMissingEmail = false;
            this.verification = true;
          })
          .catch((error) => {
            console.log(error.response.data.details);
            if(error.response.data.code == 2 && error.response.data.details[0] == "UNIQUE constraint failed: Users.username")
                this.snackBar_usernameTaken = true;
            if(error.response.data.code == 2 && error.response.data.details[0] == "UNIQUE constraint failed: Users.email")
                this.snackBar_emailTaken = true;
          });
      }
    },
    verifyCode: function () {
      this.axios
        .post(UserApi.baseUrl + "/user/verify_email", {
          email: this.emailReg,
          code: this.verificationInput,
        })
        .then(() => {
          this.username = this.usernameReg;
          this.password = this.passReg;
          this.logIn();
        })
        .catch((error) => {
          console.log(error.detail);
          this.incorrectCode = true;
        });
    },
  },
  computed:{
    comparePassword(){
      return this.passReg !== this.confirmPassword ? 'Las contraseñas no coinciden' : true
    }
  }
};
</script>

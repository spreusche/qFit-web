
<template>
   <div>
    <v-img contain src="../assets/principal.png">
    <v-container fluid class="fill-height pa-0 ma-0">
        <v-row>
            <v-col>
                <v-row justify="center" align="center">
                    <v-card rounded color="transparent" elevation="0">
                    <v-card-title class="justify-center white--text bienvenido" > 
                        <h1 >¡Bienvenido!</h1> </v-card-title>
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
                                  <v-dialog
                                      v-model="dialog"
                                      dark
                                      max-width="400px"
                                  >
                                    <template v-slot:activator="{ on, attrs }">
                                      <v-btn
                                          elevation="2"
                                          color="#337CA0"
                                          dark
                                          rounded
                                          class="mr-3 caja"
                                          v-bind="attrs"
                                          v-on="on"
                                      >REGISTRARSE</v-btn>
                                    </template>
                                    <v-card>
                                      <v-card-text>
                                        
                                          <v-row>
                                            <v-col cols="12">
                                              
                                              <v-row justify="center">
                                                <v-btn
                                                  block
                                                  elevation="2"
                                                  color="#337CA0"
                                                  dark
                                                  to="/Explorar"
                                                  @click="dialog = false"
                                                  class="mb-2"
                                                >
                                                <v-icon left >
                                                  mdi-google
                                                </v-icon>
                                                  Ingresar con Google
                                                </v-btn>
                                              </v-row>

                                              <v-divider class="mb-4"/>

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
                                              ></v-text-field>
                                              </v-row>

                                            <!--Input registro email -->
                                              <v-row>
                                                <v-text-field
                                                  label="Email *"
                                                  v-model="emailReg"
                                                  required
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
                                                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
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

                                  >INICIAR SESIÓN</v-btn>
                                </v-row>
                              </template>
                            </v-row>
                            
                        </v-card-text>
                    </v-card>
                </v-row>
            </v-col>
        </v-row>
    </v-container></v-img></div> 
</template>

<style>
  .bienvenido{
      text-shadow: 2px 3px 10px #000000;
  }
  .caja{
      font-weight: bold;
      text-shadow: 1px 1px 4px rgba(0,0,0,0.7);
  }
</style>

<script>
//import func from '../../vue-temp/vue-editor-bridge'
//import { Api } from '../api/api.js';
//import { UserApi, Credentials } from '../api/user.js';
//import { SportApi, Sport } from '../api/sport.js';
import router from '../router/index'
import { UserApi } from '../api/user'
export default {
    data(){
      return{
          show1 :false,
          dialog: false,
          username: '',
          password : '',
          token: '',
          usernameReg: '',
          emailReg: '',
          passReg: '',
          verification: false,
          verificationInput: '',
         
          showMissingEmail: false,
          showMissingUsername: false,
          showMissingPass: false,
          incorrectCode: false,

          rules: {
          required: value => !!value || 'Obligatorio',
          min: v => v.length >= 8 || 'Mínimo 8 caracteres',          
          }
          
      }
    },
    methods:{
      logIn: function(){
        this.axios.post(UserApi.baseUrl + '/user/login', {username: this.username, password: this.password})
        .then(response => {
          UserApi.token = response.data.token;
          console.log('entramos');
          this.axios.defaults.headers.common['Authorization'] = `bearer ${UserApi.token}`;
         // router.go(1);
          router.push({name:'Explorar'});
          }).catch(error => {
            console.log(error);
            if(error.code === 401){
              console.log("HOLAAAAAAa");
            }
            });
      },
      register: function(){
        
        var cont = 1;
        
        if(this.usernameReg === '' ){
          this.showMissingUsername = true;
          console.log("user vacio");
          cont = 0;
        }

        if(this.passReg === '' || this.passReg.length < 8 ){
          this.showMissingPass = true;
          console.log("pass vacio o inc");
          cont = 0;
        }

        if(this.emailReg === ''){
          this.showMissingEmail = true;
          console.log("email vacio");
          cont = 0;
        }
     //los campos restantes se llenan con "basura", luego dentro de la Web algunos campos podrian modificarse
     //y otros no, de todas formas, si no se utilizan no cambia
      if(cont){
        this.axios.post(UserApi.baseUrl + '/user', {
          username: this.usernameReg,
          password: this.passReg,
          fullName: "j d",
          gender: "male",
          birthdate: 0,
          email: this.emailReg,
          phone: "0000-0000",
          avatarUrl: " "
        }).then(() =>{
          this.showMissingUsername = false;
          this.showMissingPass = false;
          this.showMissingEmail = false;
          this.verification = true;
          
        })
        .catch(error => console.log(error.detail));
      }
    },
    verifyCode: function(){
      this.axios.post(UserApi.baseUrl + '/user/verify_email',{
        email: this.emailReg,
        code: this.verificationInput
      }).then(() => {
        this.username = this.usernameReg;
        this.password = this.passReg;
        this.logIn();
      }).catch(error => {
        console.log(error.detail);
        this.incorrectCode = true;

        });
    }
    
  }
}

</script>
<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-list-item v-bind="attrs" v-on="on">
        <v-list-item-title>Editar Perfil</v-list-item-title>
      </v-list-item>
    </template>
    <v-card>
      <v-app-bar flat dark color="#2d2d2a">
        <v-btn icon dark @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-spacer></v-spacer>

        <v-btn
            color="#00e140"
            dark
            class="caja"
            @click="[changeData(), (dialog = false)]"
        >
          GUARDAR
        </v-btn>
      </v-app-bar>

      <v-card-text>
        <v-container>
          <v-row>
            <v-col>
              <v-row>
                <v-col>
                  <v-text-field
                      label="Nombre"
                      required
                      filled
                      v-model="name"
                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field
                      label="Apellido"
                      required
                      filled
                      v-model="lastName"
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col>
                  <v-text-field
                      label="Usuario"
                      disabled
                      required
                      filled
                      v-model="username"
                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-menu
                      ref="menu"
                      v-model="menu"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                          v-model="birthdate"
                          label="Fecha de nacimiento"
                          readonly
                          filled
                          v-bind="attrs"
                          v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                        ref="picker"
                        locale="es"
                        v-model = 'birthdate'
                        :max="new Date().toISOString().substr(0, 10)"
                        min="1950-01-01"
                        @change="save"
                    ></v-date-picker>
                  </v-menu>
                </v-col>
              </v-row>
              <v-row>
                <v-text-field
                    label="Biografía"
                    v-model="biografia"
                    required
                    filled
                    counter
                    :rules="[rules.max]"
                ></v-text-field>
              </v-row>
              <v-row>
                <v-text-field
                    label="Contacto"
                    filled
                    v-model= "contact"
                    counter
                    :rules="[rules.maxContact]"
                ></v-text-field>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import {UserApi} from "@/api/user";

export default {
  data: () => ({
    dialog: false,
    date: new Date('01/01/2019'),
    menu: false,
    name: "",
    lastName: "",
    username: "",
    birthdate: "",
    contact: "",
    gender: "",
    biografia: "",

     rules:{
      max: (s) => s.length < 225 || "La cantidad máxima de caracteres es 225",
      maxContact: (s) => s.length <= 50 || "La cantidad máxima de caracteres es 50",
     },

  }),


  watch: {
    menu(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = "YEAR"));
    },
  },

  methods: {
    save(date) {
      this.$refs.menu.save(date);

    },
    changeData: function () {
      this.axios
          .put(UserApi.baseUrl + "/user/current", {
            username: this.username,
            fullName: this.name + '&' + this.lastName,
            gender: "male",
            birthdate: new Date (this.birthdate).getTime(),
            email: this.email,
            phone: this.contact,
            avatarUrl: this.avatarUrl,
          })
          .then(void console.log("Actualización del usuario confirmada"))
          .catch((error) => console.log(error));
    },
    getCurrentData: function () {
      this.axios
          .get(UserApi.baseUrl + "/user/current")
          .then((response) => {
            this.username = response.data.username;
            let fullname = response.data.fullName.split("&");
            this.name = fullname[0];
            this.lastName = fullname[1];
            this.birthdate = new Date(response.data.birthdate).toISOString().substring(0,10);
            this.email = response.data.email;
            this.contact = response.data.phone;
            this.avatarUrl = response.data.avatarUrl;
          })
          .catch((error) => console.log(error));
    },
  },
  created() {
    this.getCurrentData();
  },
 
};
</script>

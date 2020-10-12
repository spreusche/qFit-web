<template >
    <v-container fluid  id="Explorar">
        <v-row>
            <v-col>
                <h1>Explorar</h1>
                <p class="text--secondary"> Descubre rutinas de otros entrenadores</p>
            </v-col>
        </v-row>
        

        <v-row>
            <v-col cols="3">
                <v-select
                :items="items"
                label="Filtrar"
                dense
                outlined
                ></v-select>
            </v-col>

            <v-col cols="3">
                <v-select
                :items="items"
                label="Categorias"
                dense
                outlined
                ></v-select>
            </v-col>




        </v-row>

        <hr>

        <v-skeleton-loader
          v-bind="attrs"
          type="article"
        ></v-skeleton-loader>



        <v-card
            elevation="4"
            outlined
        >
        
        </v-card>
        
    </v-container>
</template>





<template>
    <v-navigation-drawer
      expand-on-hover 
      rail-width="62"
      width="330"
      rail
      class="bg-purple-lighten-2"
      theme="light"
      permanent
      :elevation="5"
    >
      <v-list>
        <v-list-item
          prepend-avatar="/src/assets/user.png"
          class="font-weight-black"
          title="Usuario"
          subtitle="Naylim Dorame"
        ></v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list density="compact" nav>
        <v-list-item class="text-pink-lighten-4 bg-pink-darken-4" 
        prepend-icon="mdi-home" title="Home" 
        value="home" to="/"></v-list-item>

        <v-list-item class="text-pink-lighten-4 bg-pink-darken-3" 
        prepend-icon="mdi-table" title="Tabla Normal" 
        value="table" to="/tabla"></v-list-item>

        <v-list-item class="text-pink-lighten-4 bg-pink-darken-2" 
        prepend-icon="mdi-table" title="Tabla CRUD" 
        value="crud" to="/crud"></v-list-item>
      </v-list>
    </v-navigation-drawer>
   
</template>
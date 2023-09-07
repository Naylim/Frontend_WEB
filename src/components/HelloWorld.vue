<template>
  <v-app>
    <v-toolbar app class="cyan">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Menu</v-toolbar-title>
    </v-toolbar>

    <v-navigation-drawer app v-model="drawer" temporary>
      <v-divider></v-divider>

      <v-list density="compact" nav>
        <v-list-item
          @click="($event) => (dialog1 = true)"
          prepend-icon="mdi-view-dashboard"
          title="Tabla"
          value="home"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-forum"
          title="Json"
          value="about"
          to="/table"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-home"
          title="Home"
          value="home"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-container>
      <v-row justify="space-around">
        <v-card width="400">
          <v-img
            height="200"
            src="https://cdn.pixabay.com/photo/2020/07/12/07/47/bee-5396362_1280.jpg"
            cover
            class="text-white"
          >
            <v-toolbar color="rgba(80, 200, 50, 0)" theme="dark">
              <template v-slot:prepend>
                <v-btn icon="$menu"></v-btn>
              </template>

              <v-toolbar-title class="text-h6"> Messages </v-toolbar-title>

              <template v-slot:append>
                <v-btn icon="mdi-dots-vertical"></v-btn>
              </template>
            </v-toolbar>
          </v-img>

          <v-card-text>
            <div class="font-weight-bold ms-1 mb-2">Today</div>

            <v-timeline density="compact" align="start">
              <v-timeline-item
                v-for="message in messages"
                :key="message.time"
                :dot-color="message.color"
                size="x-small"
              >
                <div class="mb-4">
                  <div class="font-weight-normal">
                    <strong>{{ message.from }}</strong> @{{ message.time }}
                  </div>
                  <div>{{ message.message }}</div>
                </div>
              </v-timeline-item>
            </v-timeline>
            <v-btn @click="recargarImagen()" :color="red"> RECARGAR </v-btn>
            <v-btn @click="messages = []" :color="red"> BORRAR </v-btn>
          </v-card-text>
        </v-card>
      </v-row>
    </v-container>

    <v-dialog v-model="dialog1" width="500">
      <v-card>
        <v-card-title>
          <v-table>
            <thead>
              <tr>
                <th class="text-left">Name</th>
                <th class="text-left">Calories</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in desserts" :key="item.name">
                <td>{{ item.name }}</td>
                <td>{{ item.calories }}</td>
              </tr>
            </tbody>
          </v-table>
        </v-card-title>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
export default {
  recargarImagen() {
    scr = "https://cdn.vuetifyjs.com/images/parallax/material.jpg";
  },

  data() {
    return {
      drawer: false,
      dialog1: false,
      dialog2: false,
      src: "https://cdn.vuetifyjs.com/images/parallax/material.jpg",
      desserts: [
        {
          name: "Frozen Yogurt",
          calories: 159,
        },
        {
          name: "Ice cream sandwich",
          calories: 237,
        },
        {
          name: "Eclair",
          calories: 262,
        },
        {
          name: "Cupcake",
          calories: 305,
        },
        {
          name: "Gingerbread",
          calories: 356,
        },
        {
          name: "Jelly bean",
          calories: 375,
        },
        {
          name: "Lollipop",
          calories: 392,
        },
        {
          name: "Honeycomb",
          calories: 408,
        },
        {
          name: "Donut",
          calories: 452,
        },
        {
          name: "KitKat",
          calories: 518,
        },
      ],

      messages: [
        {
          from: "You",
          message: `Sure, I'll see you later.`,
          time: "10:42am",
          color: "deep-purple-lighten-1",
        },
        {
          from: "John Doe",
          message: "Yeah, sure. Does 1:00pm work?",
          time: "10:37am",
          color: "green",
        },
        {
          from: "You",
          message: "Did you still want to grab lunch today?",
          time: "9:47am",
          color: "deep-purple-lighten-1",
        },
      ],
    };
  },
};
</script>

<template>
  <v-container> 
    <v-row justify="space-around">
      <v-card width="750" class="rounded-shaped">
        <v-img height="200" :src="url" cover class="text-white" :elevation="20"></v-img>

        <v-card-text>
          <div class="font-weight-bold ms-1 mb-2">TODAY</div>

          <v-timeline density="compact" align="start">
            <v-timeline-item
              v-for="message in messages"
              :key="message.time"
              :dot-color="message.color"
              size="x-large"
            >
              <div class="mb-4">
                <div class="font-weight-normal">
                  <strong>{{ message.from }}</strong> @{{ message.time }}
                </div>
                <div>{{ message.message }}</div>
              </div>
            </v-timeline-item>
          </v-timeline>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="messages = []" color="red">BORRAR</v-btn>
          <v-btn @click="recargarImagen()" color="blue">RECARGAR</v-btn>
        </v-card-actions>
      </v-card>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
const messages = ref([]);
const url = ref(
  "https://cdn.pixabay.com/photo/2020/07/12/07/47/bee-5396362_1280.jpg"
);
const red = ref("black");
messages.value = [
  {
    from: "Me",
    message: `Holaaaaaaaa`,
    time: "10:42am",
    color: "purple",
  },
  {
    from: "You",
    message: "Aloooo",
    time: "10:47am",
    color: "cyan",
  },
];

async function recargarImagen() { 
  let respuesta = await fetch("https://random.imagecdn.app/500/200");
  //imagen random

  url.value = respuesta.url;
  console.log(respuesta.url);
}
</script>
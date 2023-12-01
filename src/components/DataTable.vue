<template>
    <v-card class="mx-8 my-8 elevation-5">
      <v-table theme="light" class="bg-deep-purple-lighten-5"  >
        <thead>
          <tr>
            <th class="text-left font-weight-black text-white bg-deep-purple-lighten-1">Autor</th>
            <th class="text-left font-weight-black text-white bg-deep-purple-lighten-2">Titulo</th>
            <th class="text-left font-weight-black text-white bg-deep-purple-lighten-1">
              Contenido
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in publicaciones" :key="item.titulo">
            <td>{{ item.autor }}</td>
            <td>{{ item.titulo }}</td>
            <td>{{ item.texto }}</td>
          </tr>
        </tbody>
      </v-table>
    </v-card>
  </template>
  
  <script setup>
  import { ref } from "vue";
  function publicacion(autor, titulo, texto) {
    this.autor = autor;
    this.titulo = titulo;
    this.texto = texto;
  }
  const publicaciones = ref([]);
  var postJson;
  var userJson;
  
  fetch("https://jsonplaceholder.typicode.com/posts/")
    .then((response) => response.json())
    .then((json) => {
      postJson = json;
    })
    .then(
      fetch("https://jsonplaceholder.typicode.com/users/")
        .then((response) => response.json())
        .then((json) => {
          userJson = json;
        })
        .then((json) => {
          if (postJson.length != undefined) {
            for (let i = 0; i < postJson.length; i++) {
              var uId = postJson[i].userId - 1;
              publicaciones.value.push(
                new publicacion(
                  userJson[uId].name,
                  postJson[i].title,
                  postJson[i].body
                )
              );
            }
          }
        })
    );
  </script>
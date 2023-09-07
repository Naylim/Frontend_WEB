<template>

    <v-table>
      <thread>
        <tr>
          <th class="text-left font-weigth-black text-red" >
            Autor
          </th>
          <th class="text-left font-weigth-black text-red">
            Titulo
          </th>
          <th class="text-left font-weigth-black text-red">
            Contenido
          </th>
        </tr>
      </thread>
      <tbody>
        <tr 
        v-for="item in publicaciones"
        :key="item.titulo"
        >
        <td>{{ item.autor }}</td>
        <td>{{ item.titulo }}</td>
        <td>{{ item.texto }}</td>
        </tr>
      </tbody>
    </v-table>
    
      </template>
      
      <script setup>
      import { ref } from "vue";
      function publicacion(autor,titulo,texto) {
        this.autor = autor;
        this.titulo = titulo;
        this.texto = texto;
      }
      const publicaciones = ref([]);
      var postJson
      var userJson
      fetch('https://jsonplaceholder.typicode.com/posts/')
        .then((response) => response.json())
        .then((json)=>{postJson=json})
        .then(fetch('https://jsonplaceholder.typicode.com/users/')
        .then((response) => response.json())
        .then((json)=>{userJson=json})
        .then((json) => {
          console.log(userJson.length)
           for(let i=0;i<postJson.length;i++){
          var uId=postJson[i].userId -1
          publicaciones.value.push(new publicacion(userJson[uId].name,postJson[i].title,postJson[i].body))
        }
        }))
      </script>
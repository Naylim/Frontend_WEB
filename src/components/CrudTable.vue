<template>
    <v-card class="mx-8 my-8 elevation-5">
      <v-data-table 
        :headers="cabezera" 
        :items="articulos"
        :sort-by="[{ key: 'id', order: 'asc' }]"
        theme="dark"
      >
        <template v-slot:top>
<<<<<<< HEAD
          <v-toolbar flat color="indigo">
=======
          <v-toolbar flat color="indigo-lighten-1">
>>>>>>> 8bbd335790f1a6eb0bb43b513a66b34dca458fc2
            <v-toolbar-title>PUBLICACIONES (CRUD)</v-toolbar-title>
            <v-divider
            class="ms-3"
            inset
            vertical
          ></v-divider>  
           
            <v-dialog v-model="dialog" max-width="500px">
              <template v-slot:activator="{ props }">
                <v-btn color="indigo-lighten-5" dark class="mb-1" v-bind="props">
                  AGREGAR
                </v-btn>

                <v-divider class="ms-3" inset vertical></v-divider>
                <v-btn color="blue-lighten-3" dark class="mb-1" @click="cargarDatos()">
                  RECARGAR
                </v-btn>
              </template>
  
              <v-card>
                <v-card-title>
                  <span class="text-h5 text-indigo-lighten-1">{{ formTitle() }}</span>
                </v-card-title>
  
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-text-field
                        v-model="editedItem.autor"
                        label="Autor"
                      ></v-text-field>
                    </v-row>
                    <v-row>
                      <v-text-field
                        v-model="editedItem.autorid"
                        label="Id Autor"
                      ></v-text-field>
                    </v-row>
                    <v-row>
                      <v-text-field
                        v-model="editedItem.titulo"
                        label="Titulo"
                      ></v-text-field>
                    </v-row>
                    <v-row>
                      <v-text-field
                        v-model="editedItem.contenido"
                        label="Contenido"
                      ></v-text-field>
                    </v-row>
                    <v-row>
                      <v-text-field
                        v-model="editedItem.id"
                        label="Id item"
                      ></v-text-field>
                    </v-row>
                  </v-container>
                </v-card-text>
  
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="red-darken-1" @click="close()">
                    Cancelar
                  </v-btn>
                  <v-btn color="indigo-darken-1" @click="save()"> Guardar </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
  
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="text-h5 " align="center">
                  ¿Seguro que desea eliminar?
                </v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="red-darken-1" @click="closeDelete()"
                    >Cancelar
                  </v-btn>
                  <v-btn color="indigo-darken-1" @click="deleteItemConfirm()">
                    OK
                  </v-btn>
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
  
        <template v-slot:item.actions="{ item }">
          <v-icon
            size="small"
            class="me-2"
            color="green-accent-2"
            @click="editItem(item.raw)"
          >
            mdi-pencil
          </v-icon>
          <v-icon size="small" color="blue-grey-darken-1" @click="deleteItem(item.raw)">
            mdi-delete
          </v-icon>
        </template>
<<<<<<< HEAD
        
=======
        <template v-slot:no-data>
          <v-btn color="red" class="mx-5 my-5" @click="cargarDatos()">
            RECARGAR
          </v-btn>
        </template>
>>>>>>> 8bbd335790f1a6eb0bb43b513a66b34dca458fc2
      </v-data-table>
    </v-card>
  </template>
  
  <script setup>
<<<<<<< HEAD
  import { ref, onMounted } from "vue";
=======
  import { ref, watch, onMounted } from "vue";
>>>>>>> 8bbd335790f1a6eb0bb43b513a66b34dca458fc2
  const cabezera = ref([]);
  const dialog = ref(false);
  const dialogDelete = ref(false);
  const articulos = ref([]);
<<<<<<< HEAD
=======
  const editedIndex = ref(-1);
>>>>>>> 8bbd335790f1a6eb0bb43b513a66b34dca458fc2
  const postsArray = ref([]);
  const usersArray = ref([]);
  const editedItem = ref({
    autor: "",
    autorid: "",
    titulo: "",
    contenido: "",
    id: "",
  });
<<<<<<< HEAD

=======
  const defaultItem = ref({
    autor: "",
    autorid: "",
    titulo: "",
    contenido: "",
    id: "",
  });
  const fetchedItem = ref({
    autor: "",
    autorid: "",
    titulo: "",
    contenido: "",
    id: "",
  });
>>>>>>> 8bbd335790f1a6eb0bb43b513a66b34dca458fc2
  
  cabezera.value = [
    { title: "Autor", align: "start", sortable: false, key: "autor" },
    { title: "Id Autor", key: "autorid" },
    { title: "Titulo", key: "titulo" },
    { title: "Contenido", key: "contenido" },
    { title: "Id", key: "id" },
    { title: "Opciones", key: "actions", sortable: false },
  ];
  onMounted(() => {
    cargarDatos();
  });
  function formTitle() {
    return this.editedIndex === -1 ? "Nuevo Item" : "Editar Item";
  }
  
  function editItem(item) {
    this.editedIndex = this.articulos.indexOf(item);
    this.editedItem = Object.assign({}, item);
    this.dialog = true;
  }
  
  function deleteItem(item) {
    this.editedIndex = this.articulos.indexOf(item);
    this.editedItem = Object.assign({}, item);
    this.dialogDelete = true;
  }
  
  function deleteItemConfirm() {
    this.articulos.splice(this.editedIndex, 1);
    deleteItemjs(this.editItem);
    this.closeDelete();
  }
  
  function close() {
    this.editedItem = Object.assign({}, this.defaultItem);
    this.editedIndex = -1;
    this.dialog = false;
  }
  
  function closeDelete() {
    this.editedItem = Object.assign({}, this.defaultItem);
    this.editedIndex = -1;
    this.dialogDelete = false;
  }
  
  function save() {
    if (this.editedIndex > -1) {
      Object.assign(this.articulos[this.editedIndex], this.editedItem);
      editItemjs(this.editItem);
    } else {
      this.articulos.push(this.editedItem);
      postItemjs(this.editItem);
    }
    this.close();
  }
  
  function post(id, title, body, userid) {
    this.id = id;
    this.title = title;
    this.body = body;
    this.userid = userid;
  }
  
<<<<<<< HEAD
=======
  function user(id, name) {
    this.id = id;
    this.name = name;
  }
  
>>>>>>> 8bbd335790f1a6eb0bb43b513a66b34dca458fc2
  function postItemjs(item) {
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify({
        id: item.id,
        title: item.titulo,
        body: item.contenido,
        userId: item.autorid,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
  }
  
  function editItemjs(item) {
    fetch("https://jsonplaceholder.typicode.com/posts/$item.id", {
      method: "PATCH",
      body: JSON.stringify({
        id: item.id,
        title: item.titulo,
        body: item.contenido,
        userId: item.autorid,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
  }
  
  function deleteItemjs(item) {
    fetch("https://jsonplaceholder.typicode.com/posts/$item.id", {
      method: "DELETE",
    });
  }
  
  async function cargarDatos() {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts/");
    const postJson = await response.json();
    for (let i = 0; i < postJson.length; i++) {
      postsArray.value.push(
        new post(
          postJson[i].id,
          postJson[i].title,
          postJson[i].body,
          postJson[i].userId
        )
      );
    }
    // console.log("post fetch");
    const responseUser = await fetch(
      "https://jsonplaceholder.typicode.com/users/"
    );
    const userJson = await responseUser.json();
    for (let i = 0; i < userJson.length; i++) {
      usersArray.value.push(new post(userJson[i].id, userJson[i].name));
    }
    // console.log(postsArray.value.length);
    for (let i = 0; i < postsArray.value.length; i++) {
      var autorbyId = usersArray.value.find(
        (user) => user.id === postsArray.value[i].userid
      );
      let auxiliar = {
        autor: autorbyId.title,
        autorid: postsArray.value[i].userid,
        titulo: postsArray.value[i].title,
        contenido: postsArray.value[i].body,
        id: postsArray.value[i].id,
      };
      let enArray = articulos.value.find((x) => x.id === auxiliar.id);
      console.log(enArray);
      if (enArray == undefined) articulos.value.push(auxiliar);
    }
  }
  </script>
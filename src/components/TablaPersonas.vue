<template>
  <v-card class="mx-8 my-8 elevation-5">
    <v-data-table
      :headers="cabezera"
      :items="personas"
      :sort-by="[{ key: 'id', order: 'asc' }]"
      theme="dark"
    >
      <template v-slot:top>
        <v-toolbar flat color="indigo-lighten-1">
          <v-toolbar-title>PERSONAS (CRUD)</v-toolbar-title>
          <v-divider class="ms-3" inset vertical></v-divider>

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
                      v-model="editedItem.id" 
                      label="ID"></v-text-field>
                  </v-row>
                  <v-row>
                    <v-text-field
                      v-model="editedItem.rfc"
                      label="RFC"
                    ></v-text-field>
                  </v-row>
                  <v-row>
                    <v-text-field
                      v-model="editedItem.nombre"
                      label="NOMBRE"
                    ></v-text-field>
                  </v-row>
                  <v-row>
                    <v-text-field
                      v-model="editedItem.imagen"
                      label="IMAGEN"
                    ></v-text-field>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red-darken-1" @click="close()"> Cancelar </v-btn>
                <v-btn color="indigo-darken-1" @click="save()"> Guardar </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5" align="center">
                ¿Seguro que desea eliminar?
              </v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red-darken-1" @click="closeDelete()">Cancelar </v-btn>
                <v-btn color="indigo-darken-1" @click="deleteItemConfirm()"> OK </v-btn>
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
    </v-data-table>
  </v-card>
</template>

<script setup>
  import { ref, onMounted } from "vue";
  import axios from "axios";
  
  let per;
  const cabezera = ref([]); //cabezera de la tabla
  const dialog = ref(false); //controlan la visibilidad de los cuadros de diálogo de edición y eliminación
  const dialogDelete = ref(false);
  const personas = ref([]); //arreglo de personas obtenidas
  const editedIndex = ref(-1);
  const editedItem = ref({// almacena los datos del elemento que se está editando (ventana emergente)
    id: "",
    rfc: "",
    nombre: "",
    imagen: "",
  });

  cabezera.value = [
    { title: "ID", key: "id" },
    { title: "RFC", key: "rfc" },
    { title: "Nombre", key: "nombre" },
    { title: "Archivo Imagen", key: "imagen" },
    { title: "Opciones", key: "actions", sortable: false },
  ];
  onMounted(() => {
    cargarDatos();
  });


  function formTitle() { //titulo del form
    return this.editedIndex === -1 ? "Nuevo Item" : "Editar Item";
  }
  //------------------edit y delete de front----------------------
  function editItem(item) {
    per = item;
    this.editedIndex = personas.value.indexOf(item);
    this.editedItem = Object.assign({}, item);
    this.dialog = true;
  }
  
  function deleteItem(item) {
    per = item;
    this.editedIndex = this.personas.indexOf(item);
    this.editedItem = Object.assign({}, item);
    this.dialogDelete = true;
  }

  function deleteItemConfirm() {
    this.personas.splice(this.editedIndex, 1);
    console.log(per);
    deleteItemjs(per);
    this.closeDelete();
  }
  function closeDelete() {
    this.editedItem = Object.assign({}, this.defaultItem);
    this.editedIndex = -1;
    this.dialogDelete = false;
  }
    //----------opc. del emergente save------------------
  function close() {
    this.editedItem = Object.assign({}, this.defaultItem);
    this.editedIndex = -1;  
    this.dialog = false;
  }
  function save() { //-----metodo save para la ventana emergente--------
    if (this.editedIndex > -1) { //si el index es mayor a -1 edita
      per = this.editedItem;
      editItemjs(per);
      Object.assign(this.personas[this.editedIndex], this.editedItem);

    } else { //si no, agrega uno nuevo
      this.personas.push(this.editedItem); 
      per = this.editedItem;
      postItemjs(per);
    }
    this.close();
  }

  function post(id, rfc, nombre, imagen) {
    this.id = id;
    this.rfc = rfc;
    this.nombre = nombre;
    this.imagen = imagen;
  }

  
//-----------metodos js----------------
  function postItemjs(item) {
  axios.post( "http://localhost:4000/personas",
      {
        id: item.id,
        rfc: item.rfc,
        nombre: item.nombre,
        imagen: item.imagen,
      },
      {
        headers: {"Content-type": "application/json; charset=UTF-8",},
      }
  )
    .then((response) => {
      console.log(response.data);
      router.push("/personas");
    })
    .catch((error) => {
      console.error(error.response.data);
    });
  }

  function editItemjs(item) {
    console.log(item);
    fetch("http://localhost:4000/personas/"+ item.id, {
      method: "PUT",
      body: JSON.stringify({
        id: item.id,
        rfc: item.rfc,
        nombre: item.nombre,
        imagen: item.imagen,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
  }
  
  function deleteItemjs(item) {

    fetch("http://localhost:4000/personas/"+ item.id, {
      method: "DELETE",
    });
  }

  async function cargarDatos() {
    const response = await fetch("http://localhost:4000/personas");
    const postJson = await response.json(); //respuesta de fetch

    for (let i = 0; i < postJson.length; i++) {
      let auxiliar = {
            id: postJson[i].id, //obtiene los datos de la respuesta obtenida y los almacena en un array
            rfc: postJson[i].rfc,
            nombre: postJson[i].nombre,
            imagen: postJson[i].imagen,
      };
      
      let enArray = personas.value.find((x) => x.id === auxiliar.id);

      if (enArray === undefined) {
        personas.value.push(auxiliar);
      }
    }
  }
  
</script>

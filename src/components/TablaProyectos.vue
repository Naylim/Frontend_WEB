<template>
    <v-card class="mx-8 my-8 elevation-5">
      <v-data-table
        :headers="cabezera"
        :items="proyectos"
        :sort-by="[{ key: 'id', order: 'asc' }]"
        theme="dark"
      >
        <template v-slot:top>
          <v-toolbar flat color="indigo-lighten-2">
            <v-toolbar-title>PROYECTOS (CRUD)</v-toolbar-title>
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
                        v-model="editedItem.nombre"
                        label="NOMBRE"
                      ></v-text-field>
                    </v-row>
                    <v-row>
                      <v-text-field
                        v-model="editedItem.descripcion"
                        label="DESCRIPCION"
                      ></v-text-field>
                    </v-row>
                    <v-row>
                      <v-text-field
                        v-model="editedItem.imagen"
                        label="IMAGEN"
                      ></v-text-field>
                    </v-row>
                    <v-row>
                        <v-text-field
                          v-model="editedItem.cantidadDonada"
                          label="CANTIDAD DONADA"
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
    const proyectos = ref([]); //arreglo de proyectos obtenidos
    const editedIndex = ref(-1);
    const editedItem = ref({// almacena los datos del elemento que se está editando (ventana emergente)
      id: "",
      nombre: "",
      descripcion: "",
      imagen: "",
      cantidadDonada: "",
    });
  
    cabezera.value = [
      { title: "ID", key: "id" },
      { title: "Nombre", key: "nombre" },
      { title: "Descripcion", key: "descripcion" },
      { title: "Imagen", key: "imagen" },
      { title: "Cantidad Donada", key: "cantidadDonada" },
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
      this.editedIndex = proyectos.value.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    }
    
    function deleteItem(item) {
        per = item;
      this.editedIndex = this.proyectos.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    }
  
    function deleteItemConfirm() {
      this.proyectos.splice(this.editedIndex, 1);
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
        Object.assign(this.proyectos[this.editedIndex], this.editedItem);
  
      } else { //si no, agrega uno nuevo
        this.proyectos.push(this.editedItem); 
        per = this.editedItem;
        postItemjs(per);
      }
      this.close();
    }
  
    function post(id, nombre, descripcion, imagen, cantidadDonada) {
      this.id = id;
      this.nombre = nombre;
      this.descripcion = descripcion;
      this.imagen = imagen;
      this.cantidadDonada = cantidadDonada;
    }
  
    
  //-----------metodos js----------------
    function postItemjs(item) {
    axios.post( "http://localhost:4000/proyectos",
        {
          id: item.id,
          nombre: item.nombre,
          descripcion: item.descripcion,
          imagen: item.imagen,
          cantidadDonada: item.cantidadDonada,
        },
        {
          headers: {"Content-type": "application/json; charset=UTF-8",},
        }
    )
      .then((response) => {
        console.log(response.data);
        router.push("/proyectos");
      })
      .catch((error) => {
        console.error(error.response.data);
      });
    }
  
    function editItemjs(item) {
      console.log(item);
      fetch("http://localhost:4000/proyectos/"+ item.id, {
        method: "PUT",
        body: JSON.stringify({
            id: item.id,
            nombre: item.nombre,
            descripcion: item.descripcion,
            imagen: item.imagen,
            cantidadDonada: item.cantidadDonada,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((json) => console.log(json));
    }
    
    function deleteItemjs(item) {
  
      fetch("http://localhost:4000/proyectos/"+ item.id, {
        method: "DELETE",
      });
    }
  
    async function cargarDatos() {
      const response = await fetch("http://localhost:4000/proyectos");
      const postJson = await response.json(); //respuesta de fetch
  
      for (let i = 0; i < postJson.length; i++) {
        let auxiliar = {
              id: postJson[i].id, //obtiene los datos de la respuesta obtenida y los almacena en un array
              nombre: postJson[i].nombre,
              descripcion: postJson[i].descripcion,
              imagen: postJson[i].imagen,
              cantidadDonada: postJson[i].cantidadDonada,
        };
        
        let enArray = proyectos.value.find((x) => x.id === auxiliar.id);
  
        if (enArray === undefined) {
          proyectos.value.push(auxiliar);
        }
      }
    }
    
  </script>
  
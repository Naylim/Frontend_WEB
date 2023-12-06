<template>
    <v-card class="mx-8 my-8 elevation-5">
      <v-data-table
        :headers="cabezera"
        :items="donadores"
        :sort-by="[{ key: 'id', order: 'asc' }]"
        theme="dark"
      >
        <template v-slot:top>
          <v-toolbar flat color="indigo-lighten-3">
            <v-toolbar-title>DONADORES DE PROYECTOS</v-toolbar-title>
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
                        v-model="editedItem.personaID"
                        label="ID persona asociada"
                      ></v-text-field>
                    </v-row>
                    <v-row>
                      <v-text-field
                        v-model="editedItem.proyectoID"
                        label="ID proyecto asociado"
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
            size="small" class="me-2" color="green-accent-2" @click="editItem(item.raw)">
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
    const donadores = ref([]); //arreglo de filas en la tabla
    const editedIndex = ref(-1);
    const editedItem = ref({// almacena los datos del elemento que se está editando (ventana emergente)
      id: "",
      personaID: "",
      nombrePersona: "",
      proyectoID: "",
      nombreProyecto: "",
    });
  
    cabezera.value = [
      { title: "ID", key: "id" },
      { title: "ID PERSONA", key: "personaID" },
      { title: "NOMBRE PERSONA", key: "nombrePersona" },
      { title: "ID PROYECTO", key: "proyectoID" },
      { title: "NOMBRE PROYECTO", key: "nombreProyecto" },
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
      this.editedIndex = donadores.value.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    }
    
    function deleteItem(item) {
      per = item;
      console.log(per);
      this.editedIndex = this.donadores.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    }
  
    function deleteItemConfirm() {
      this.donadores.splice(this.editedIndex, 1);
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
        Object.assign(this.donadores[this.editedIndex], this.editedItem);
  
      } else { //si no, agrega uno nuevo
        this.donadores.push(this.editedItem); 
        per = this.editedItem;
        postItemjs(per);
      }
      this.close();
      location.reload();
    }

    function post(id, personaID, proyectoID, nombreProyecto) {
      this.id = id;
      this.personaID = personaID;
      this.proyectoID = proyectoID;
      this.nombreProyecto = nombreProyecto;
    }
  
    
  //-----------metodos js----------------
    function postItemjs(item) {
    axios.post( "http://localhost:4000/donadores",
        {
          personaId: item.personaID,
          proyectoId: item.proyectoID
        },
        {
          headers: {"Content-type": "application/json; charset=UTF-8",},
        }
    )
      .then((response) => {
        console.log(response.data);
        router.push("/donadores");
      })
      .catch((error) => {
        console.error(error.response.data);
      });
    }
  
    function editItemjs(item) {
      console.log(item);
      fetch("http://localhost:4000/donadores/"+ item.id, {
        method: "PUT",
        body: JSON.stringify({
          personaId: item.personaID,
          proyectoId: item.proyectoID
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((json) => console.log(json));
    }
    
    function deleteItemjs(item) {
  
      fetch("http://localhost:4000/donadores/"+ item.id, {
        method: "DELETE",
      });
    }

    async function cargarDatos() {
      // Obtener datos de donadores
      const donadoresResponse = await fetch("http://localhost:4000/donadores");
      const donadoresJson = await donadoresResponse.json();
      // Obtener datos de personas
      const personasResponse = await fetch("http://localhost:4000/personas");
      const personasJson = await personasResponse.json();
      // Obtener datos de proyectos
      const proyectosResponse = await fetch("http://localhost:4000/proyectos");
      const proyectosJson = await proyectosResponse.json();

      // Iterar sobre los donadores y construir el arreglo deseado
      for (let i = 0; i < donadoresJson.length; i++) {
        const donador = donadoresJson[i];
        // Encontrar la persona correspondiente
        const persona = personasJson.find(p => p.id === donador.personaID);
        // Encontrar el proyecto correspondiente
        const proyecto = proyectosJson.find(p => p.id === donador.proyectoID);

        // Verificar que ambos existan antes de agregar al arreglo
        if (persona && proyecto) {
          const nuevoDato = {
            id: donador.id,
            personaID: donador.personaID,
            proyectoID: donador.proyectoID,
            nombrePersona: persona.nombre,
            nombreProyecto: proyecto.nombre
          };

          // Agregar al arreglo
          donadores.value.push(nuevoDato);
        }
      }

      // Puedes hacer algo con el arreglo resultante, como imprimirlo en la consola
      //console.log(donadores);
    }


  </script>
  
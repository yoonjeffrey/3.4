<template>
  <div>
    <h1 class="text-h4 mb-4">Panel de Administración</h1>

    <v-card class="mb-6">
      <v-card-title>Búsquedas Administrativas</v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="searchTagsUsers"
              label="Buscar Usuarios por ID de Etiqueta (ej: 1,2)"
              append-inner-icon="mdi-magnify"
              @click:append-inner="searchUsersByTags"
              @keyup.enter="searchUsersByTags"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="searchTagsTasks"
              label="Buscar Tareas por ID de Etiqueta (ej: 1,2)"
              append-inner-icon="mdi-magnify"
              @click:append-inner="searchTasksByTags"
              @keyup.enter="searchTasksByTags"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="searchUsersTags"
              label="Buscar Etiquetas por ID de Usuario (ej: 1,2)"
              append-inner-icon="mdi-magnify"
              @click:append-inner="searchTagsByUsers"
              @keyup.enter="searchTagsByUsers"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <v-card v-if="searchResults.length > 0" class="mb-6">
      <v-card-title>Resultados de Búsqueda</v-card-title>
      <v-card-text>
        <pre>{{ JSON.stringify(searchResults, null, 2) }}</pre>
      </v-card-text>
      <v-card-actions>
        <v-btn text @click="searchResults = []">Limpiar</v-btn>
      </v-card-actions>
    </v-card>

    <v-card>
      <v-card-title class="d-flex align-center">
        Gestión de Usuarios
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="openCreateUserDialog">Crear Usuario</v-btn>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="users"
        :loading="loadingUsers"
      >
        <template v-slot:item.active="{ item }">
          <v-chip :color="item.active ? 'success' : 'error'" size="small">
            {{ item.active ? 'Activo' : 'Inactivo' }}
          </v-chip>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-btn icon size="small" color="primary" class="mr-2" @click="toggleActive(item)">
            <v-icon>{{ item.active ? 'mdi-cancel' : 'mdi-check' }}</v-icon>
          </v-btn>
          <v-btn icon size="small" color="error" @click="deleteUser(item.id)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-card>

    <v-dialog v-model="userDialog" max-width="500">
      <v-card>
        <v-card-title>Crear Usuario</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="saveUser">
            <v-text-field v-model="newUser.name" label="Nombre" required></v-text-field>
            <v-text-field v-model="newUser.email" label="Email" type="email" required></v-text-field>
            <v-text-field v-model="newUser.password" label="Contraseña" type="password" required></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="userDialog = false">Cancelar</v-btn>
          <v-btn color="primary" @click="saveUser">Guardar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import api from '../services/api';

const users = ref([]);
const loadingUsers = ref(false);

const searchTagsUsers = ref('');
const searchTagsTasks = ref('');
const searchUsersTags = ref('');
const searchResults = ref([]);

const userDialog = ref(false);
const newUser = ref({ name: '', email: '', password: '' });

const headers = [
  { title: 'ID', key: 'id' },
  { title: 'Nombre', key: 'name' },
  { title: 'Email', key: 'email' },
  { title: 'Rol', key: 'role' },
  { title: 'Estado', key: 'active' },
  { title: 'Acciones', key: 'actions', sortable: false },
];

const fetchUsers = async () => {
  loadingUsers.value = true;
  try {
    const res = await api.get('/users');
    users.value = res.data.data;
  } catch (error) {
    console.error(error);
  } finally {
    loadingUsers.value = false;
  }
};

const searchUsersByTags = async () => {
  if (!searchTagsUsers.value) return;
  try {
    const res = await api.get(`/admin/search/usuarios-por-etiquetas?tags=${searchTagsUsers.value}`);
    searchResults.value = res.data.data;
  } catch (e) { console.error(e); }
};

const searchTasksByTags = async () => {
  if (!searchTagsTasks.value) return;
  try {
    const res = await api.get(`/admin/search/tareas-por-etiquetas?tags=${searchTagsTasks.value}`);
    searchResults.value = res.data.data;
  } catch (e) { console.error(e); }
};

const searchTagsByUsers = async () => {
  if (!searchUsersTags.value) return;
  try {
    const res = await api.get(`/admin/search/etiquetas-por-usuarios?users=${searchUsersTags.value}`);
    searchResults.value = res.data.data;
  } catch (e) { console.error(e); }
};

const openCreateUserDialog = () => {
  newUser.value = { name: '', email: '', password: '' };
  userDialog.value = true;
};

const saveUser = async () => {
  try {
    await api.post('/users/register', newUser.value);
    userDialog.value = false;
    fetchUsers();
  } catch (error) {
    console.error(error);
  }
};

const toggleActive = async (user) => {
  try {
    const endpoint = user.active ? `/users/${user.id}/deactivate` : `/users/${user.id}/activate`;
    await api.patch(endpoint);
    fetchUsers();
  } catch (error) {
    console.error(error);
  }
};

const deleteUser = async (id) => {
  if (confirm('¿Eliminar permanentemente este usuario?')) {
    try {
      await api.delete(`/users/${id}`);
      fetchUsers();
    } catch (error) {
      console.error(error);
    }
  }
};

onMounted(() => {
  fetchUsers();
});
</script>

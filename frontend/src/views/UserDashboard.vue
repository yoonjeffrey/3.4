<template>
  <div>
    <h1 class="text-h4 mb-4">Mis Tareas</h1>
    
    <v-row class="mb-4">
      <v-col cols="12" sm="8">
        <v-text-field
          v-model="searchQuery"
          label="Buscar tareas..."
          append-inner-icon="mdi-magnify"
          @click:append-inner="searchTasks"
          @keyup.enter="searchTasks"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="4">
        <v-btn color="primary" block height="56" @click="openCreateDialog">
          Nueva Tarea
        </v-btn>
      </v-col>
    </v-row>

    <v-card v-if="loading" class="pa-4 text-center">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </v-card>

    <v-row v-else>
      <v-col v-for="tarea in tareas" :key="tarea.id" cols="12" md="6" lg="4">
        <v-card>
          <v-card-title>{{ tarea.title }}</v-card-title>
          <v-card-text>
            {{ tarea.description }}
            <div class="mt-2 text-caption">Status: {{ tarea.status }}</div>
            <div class="mt-2">
              <v-chip v-for="tag in tarea.Tags" :key="tag.id" size="small" class="mr-1">
                {{ tag.name }}
              </v-chip>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-btn color="error" text @click="deleteTask(tarea.id)">Eliminar</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- Dialogo para Nueva Tarea -->
    <v-dialog v-model="dialog" max-width="500">
      <v-card>
        <v-card-title>Nueva Tarea</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="saveTask">
            <v-text-field v-model="newTask.title" label="Título" required></v-text-field>
            <v-textarea v-model="newTask.description" label="Descripción"></v-textarea>
            <v-select v-model="newTask.status" :items="['pending', 'in_progress', 'completed']" label="Estado"></v-select>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey" text @click="dialog = false">Cancelar</v-btn>
          <v-btn color="primary" @click="saveTask">Guardar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import api from '../services/api';

const tareas = ref([]);
const loading = ref(false);
const searchQuery = ref('');
const dialog = ref(false);
const newTask = ref({ title: '', description: '', status: 'pending' });

const fetchTasks = async () => {
  loading.value = true;
  try {
    const res = await api.get('/tareas');
    tareas.value = res.data.data;
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};

const searchTasks = async () => {
  if (!searchQuery.value) {
    return fetchTasks();
  }
  loading.value = true;
  try {
    const res = await api.get(`/tareas/buscar?q=${searchQuery.value}`);
    tareas.value = res.data.data;
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};

const openCreateDialog = () => {
  newTask.value = { title: '', description: '', status: 'pending' };
  dialog.value = true;
};

const saveTask = async () => {
  try {
    await api.post('/tareas', newTask.value);
    dialog.value = false;
    fetchTasks();
  } catch (error) {
    console.error(error);
  }
};

const deleteTask = async (id) => {
  try {
    await api.delete(`/tareas/${id}`);
    fetchTasks();
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  fetchTasks();
});
</script>

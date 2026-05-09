<template>
  <v-card class="mx-auto mt-10" max-width="400">
    <v-card-title class="text-h5 text-center">Login</v-card-title>
    <v-card-text>
      <v-form @submit.prevent="handleLogin">
        <v-text-field
          v-model="email"
          label="Email"
          type="email"
          required
        ></v-text-field>
        <v-text-field
          v-model="password"
          label="Password"
          type="password"
          required
        ></v-text-field>
        <v-btn type="submit" color="primary" block class="mt-4" :loading="loading">
          Login
        </v-btn>
      </v-form>
      <v-alert v-if="error" type="error" class="mt-4">{{ error }}</v-alert>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../store/auth';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const loading = ref(false);
const error = ref('');

const authStore = useAuthStore();
const router = useRouter();

const handleLogin = async () => {
  loading.value = true;
  error.value = '';
  try {
    const success = await authStore.login(email.value, password.value);
    if (success) {
      if (authStore.isAdmin) {
        router.push('/admin');
      } else {
        router.push('/dashboard');
      }
    } else {
      error.value = 'Invalid credentials';
    }
  } catch (e) {
    error.value = e.response?.data?.message || 'Error during login';
  } finally {
    loading.value = false;
  }
};
</script>

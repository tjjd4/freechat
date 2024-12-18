<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

import { isLogin, loginUser } from '../api/user';

const router = useRouter();
const username = ref('');
const password = ref('');
const isLoggedIn = ref(false);
const errorMsg = ref('');

const auth = async () => {
  try {
    const result = await isLogin();

    if (result) {
      isLoggedIn.value = true;
    } else {
      isLoggedIn.value = false;
    }
  } catch (error) {
    isLoggedIn.value = false;
    console.error('Authentication failed:', error);
  }
};

const goDashboard = async () => {
  if (await isLogin()) {
    router.push('/dashboard');
  }
};

// 處理 Login 按鈕的點擊事件
const handleLogin = async () => {
  if (!username.value || !password.value) {
    errorMsg.value = 'Please enter account and password.';
    return;
  }

  try {
    const result = await loginUser(username.value, password.value);

    if (result.success) {
      auth();
    } else {
      errorMsg.value = result.message;
    }
  } catch (error) {
    console.error('API error:', error);
    alert('An error occurred while logging in.');
  }
};

onMounted(async () => {
  await auth();
});
</script>

<template>
  <div class="flex items-center justify-center h-screen bg-black text-white">
    <div class="w-full max-w-sm space-y-8">
      <!-- Title -->
      <h1 class="text-center text-5xl font-bold">freechat</h1>
      <div v-if="isLoggedIn" class="text-center space-y-3">
        <p class="text-2xl">Welcome Back</p>
        <button
          type="button"
          class="w-full py-2 bg-white text-black font-bold rounded-md hover:bg-gray-400"
          @click="goDashboard"
        >
          DASHBOARD
        </button>
      </div>

      <!-- Form -->
      <form v-else class="space-y-4" @submit.prevent="handleLogin">
        <!-- Account Input -->
        <input
          type="text"
          v-model="username"
          placeholder="Account"
          class="w-full px-4 py-2 bg-gray-800 rounded-md focus:ring-2 focus:ring-white focus:outline-none"
        />

        <!-- Password Input -->
        <input
          type="password"
          v-model="password"
          placeholder="Password"
          class="w-full px-4 py-2 bg-gray-800 rounded-md focus:ring-2 focus:ring-white focus:outline-none"
        />
        <p class="text-red-500">{{ errorMsg }}</p>

        <button
          type="submit"
          class="w-full py-2 bg-white text-black font-bold rounded-md hover:bg-gray-200"
        >
          LOGIN
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped></style>

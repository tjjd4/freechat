<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const account = ref('');
const password = ref('');
const isLoggedIn = ref(false);
const name = ref('');
const errorMsg = ref('');

const checkLogin = async () => {
  try {
    const response = await fetch('http://localhost:3000/is_login', {
      method: 'GET',
      credentials: 'include',
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data)
      if (data.success) {
        isLoggedIn.value = true;
        name.value = data.name;
      } else {
        isLoggedIn.value = false;
      }
    } else {
      isLoggedIn.value = false;
    }
  } catch (error) {
    console.error('Authentication failed:', error);
  }
};

const goDashboard = async () => {
  await checkLogin();
  if (isLoggedIn) {
    router.push('/dashboard');
  }
};

// 處理 Login 按鈕的點擊事件
const handleLogin = async () => {
  if (!account.value || !password.value) {
    alert('Please enter account and password.');
    return;
  }

  try {
    const response = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        username: account.value,
        password: password.value,
      }),
    });

    if (response.ok) {
      await checkLogin();
      router.push('/');
    } else {
      const error = await response.json();
      errorMsg.value = error.message;
    }
  } catch (err) {
    console.error('API error:', err);
    alert('An error occurred while logging in.');
  }
};

onMounted(async () => {
  await checkLogin();
});
</script>

<template>
  <div class="flex items-center justify-center h-screen bg-black text-white">
    <div class="w-full max-w-sm space-y-8">
      <!-- Title -->
      <h1 class="text-center text-5xl font-bold">freechat</h1>
      <div v-if="isLoggedIn" class="text-center space-y-3">
        <p class="text-2xl">Welcome back, {{ name }}!</p>
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
          v-model="account"
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

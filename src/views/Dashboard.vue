<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const memberName = ref('John Doe');

const handleLogout = async () => {
  try {
    const response = await fetch('http://localhost:3000/logout', {
      method: 'POST',
      credentials: 'include',
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data.message);
      router.push('/');
    } else {
      console.error('Failed to logout');
    }
  } catch (error) {
    console.error('Error during logout:', error);
  }
};
</script>

<template>
  <div
    class="min-h-screen bg-black text-white font-mono flex flex-col items-center justify-center p-4"
  >
    <main class="w-full max-w-md space-y-8 text-center">
      <h1 class="text-4xl font-bold tracking-wider mb-12">freechat</h1>
      <div class="space-y-4">
        <p class="text-2xl">Welcome,</p>
        <p class="text-4xl font-bold text-gray-300">{{ memberName }}</p>
      </div>
      <button
        @click="handleLogout"
        class="w-full bg-white text-black hover:bg-gray-200 transition-colors py-2 rounded"
      >
        LOGOUT
      </button>
    </main>
  </div>
</template>

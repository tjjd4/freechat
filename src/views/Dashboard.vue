<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

import { getUserInfo, logoutUser } from '../api/user';
import { getFriendList } from '../api/friend';
import { FriendPair } from '../types/types';

const router = useRouter();
const memberName = ref('');
const friends = ref<FriendPair[] | null>(null);

const fetchUserInfo = async () => {
  try {
    const userInfo = await getUserInfo();
    if (userInfo) {
      memberName.value = userInfo.name;
    }
  } catch (error) {
    console.error('Authentication failed:', error);
  }
};

const fetchFriendList = async () => {
  try {
    const friendList = await getFriendList();
    if (friendList && friendList.length > 0) {
      friends.value = friendList;
    } else {
      friends.value = null;
    }
  } catch (error) {
    console.error('Get Friends failed:', error);
  }
}

const handleLogout = async () => {
  try {
    const result = await logoutUser();

    if (result) {
      router.push('/');
    } else {
      console.error('Failed to logout');
    }
  } catch (error) {
    console.error('Error during logout:', error);
  }
};

onMounted(async () => {
  fetchUserInfo();
  fetchFriendList();
});
</script>

<template>
  <div class="min-h-screen bg-black text-white font-mono flex flex-col items-center justify-center p-4">
    <main class="w-full max-w-md space-y-8 text-center">
      <!-- Title -->
      <h1 class="text-4xl font-bold tracking-wider mb-12">freechat</h1>

      <!-- Welcome Section -->
      <div class="space-y-4">
        <p class="text-2xl">Welcome,</p>
        <p class="text-4xl font-bold text-gray-300">{{ memberName }}</p>
      </div>

      <!-- Friend List Section -->
      <div class="w-full rounded p-4 space-y-4">
        <h2 class="text-2xl font-bold mb-4 text-white">Friends:</h2>
        <div v-if="friends !== null" class="max-h-60 overflow-y-auto space-y-2">
          <div
            v-for="friend in friends"
            :key="friend.friend_id"
          >
            <p class="text-lg">{{ friend.friend_id }}</p>
          </div>
        </div>
      </div>

      <!-- Logout Button -->
      <button
        @click="handleLogout"
        class="w-full bg-white text-black hover:bg-gray-200 transition-colors py-2 rounded"
      >
        LOGOUT
      </button>
    </main>
  </div>
</template>

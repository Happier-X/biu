<template>
  <div class="w-full">
    <ul class="list">
      <li
        class="list-row h-[60px]"
        v-for="(item, index) in searchStore.searchResultList"
        :key="index"
      >
        {{ item.Name }}
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
import { useSearchStore } from '@renderer/stores/search'
const searchStore = useSearchStore()
</script>

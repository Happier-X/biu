<template>
  <div class="w-screen h-screen flex flex-col">
    <div class="w-full h-[60px]">
      <Search v-drag-window></Search>
    </div>
    <div class="w-full max-h-[600px] flex-1 overflow-y-scroll no-scrollbar">
      <Result v-if="searchStore.isShowResults"></Result>
    </div>
  </div>
</template>
<script setup lang="ts">
import Search from '@renderer/components/Search.vue'
import Result from '@renderer/components/Result.vue'
import { useSearchStore } from '@renderer/stores/search'

// 搜索仓库
const searchStore = useSearchStore()
</script>

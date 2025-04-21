<template>
  <Search></Search>
  <Result v-if="searchStore.isShowResults"></Result>
</template>
<script setup lang="ts">
import Search from '@renderer/components/Search.vue'
import Result from '@renderer/components/Result.vue'
import { useSearchStore } from '@renderer/stores/search'

// 搜索仓库
const searchStore = useSearchStore()
</script>

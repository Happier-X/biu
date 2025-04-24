<template>
  <div class="flex w-full h-full">
    <input
      type="text"
      placeholder="你好..."
      autofocus
      class="w-full h-full input input-ghost input-xl focus:outline-none select-none"
      @input="handleSearchInput"
    />
    <div class="h-full avatar p-[0.6rem] pl-0 select-none">
      <div class="h-full rounded-full">
        <img draggable="false" class="pointer-events-none" src="" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useSearchStore } from '@renderer/stores/search'

// 搜索仓库
const searchStore = useSearchStore()
/**
 * 处理搜索输入
 * @param e 输入事件
 */
const handleSearchInput = (e: Event): void => {
  const target = e.target as HTMLInputElement
  searchStore.handleSearchInput(target.value)
}
</script>

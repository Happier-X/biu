<template>
  <div class="w-full">
    <ul class="list">
      <li
        class="list-row h-[60px]"
        :class="currentIndex === index ? 'bg-base-300' : ''"
        v-for="(item, index) in searchStore.searchResultList"
        :key="index"
        @click="handleSelect(item)"
      >
        {{ item.Name }}
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
import { ref, onBeforeUnmount } from 'vue'
import { useSearchStore } from '@renderer/stores/search'
const searchStore = useSearchStore()
const currentIndex = ref(0)
const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'ArrowDown') {
    currentIndex.value = (currentIndex.value + 1) % searchStore.searchResultList.length
  } else if (event.key === 'ArrowUp') {
    currentIndex.value =
      (currentIndex.value - 1 + searchStore.searchResultList.length) %
      searchStore.searchResultList.length
  }
}
window.addEventListener('keydown', handleKeydown)
onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown)
  window.removeEventListener('keydown', handleEnter)
})
const handleSelect = (item) => {
  window.electron.ipcRenderer.send('open-app', item.AppID)
}
const handleEnter = (event: KeyboardEvent) => {
  if (event.key === 'Enter') {
    const selectedItem = searchStore.searchResultList[currentIndex.value]
    if (selectedItem) {
      window.electron.ipcRenderer.send('open-app', selectedItem.AppID)
    }
  }
}
window.addEventListener('keydown', handleEnter)
</script>

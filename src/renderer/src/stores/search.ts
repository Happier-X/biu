import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSearchStore = defineStore('search', () => {
  // 搜索内容
  const searchContent = ref('')
  // 是否展示搜索结果
  const isShowResults = ref(false)
  /**
   * 处理搜索输入
   * @param content 搜索内容
   */
  const handleSearchInput = (content: string | null): void => {
    searchContent.value = content || ''
    if (searchContent.value.length > 0) {
      isShowResults.value = true
      window.electron.ipcRenderer.send('resize-window', 660)
    } else {
      isShowResults.value = false
      window.electron.ipcRenderer.send('resize-window', 60)
    }
  }

  return { searchContent, isShowResults, handleSearchInput }
})

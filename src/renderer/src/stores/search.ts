import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSearchStore = defineStore('search', () => {
  // 搜索内容
  const searchContent = ref('')
  // 是否展示搜索结果
  const isShowResults = ref(false)
  /**
   * 清空搜索内容
   */
  const clearSearchContent = () => {
    searchContent.value = ''
    isShowResults.value = false
    searchResultList.value = []
    window.electron.ipcRenderer.send('resize-window', 60)
  }
  /**
   * 处理搜索输入
   * @param content 搜索内容
   */
  const handleSearchInput = (content: string | null): void => {
    searchContent.value = content || ''
    if (searchContent.value.length > 0) {
      isShowResults.value = true
      searchResultList.value = appList.value.filter((item) => {
        return item.name.toLowerCase().includes(searchContent.value.toLowerCase())
      })
      if (searchResultList.value.length > 10) {
        window.electron.ipcRenderer.send('resize-window', 60 * 11)
      } else {
        window.electron.ipcRenderer.send('resize-window', 60 * (searchResultList.value.length + 1))
      }
    } else {
      isShowResults.value = false
      searchResultList.value = []
      window.electron.ipcRenderer.send('resize-window', 60)
    }
  }
  // 应用列表
  const appList = ref([])
  /**
   * 设置应用列表
   * @param app 应用列表
   */
  const setDownloadApps = (list): void => {
    appList.value = list
  }
  // 搜索结果列表
  const searchResultList = ref([])
  return {
    searchContent,
    isShowResults,
    handleSearchInput,
    setDownloadApps,
    appList,
    searchResultList,
    clearSearchContent
  }
})

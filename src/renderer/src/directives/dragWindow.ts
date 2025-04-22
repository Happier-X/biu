import { Directive } from 'vue'

/**
 * 窗口拖动自定义指令
 * 使用方法: v-drag-window
 */
export const dragWindow: Directive = {
  mounted(el: HTMLElement) {
    let animationId: number
    let mouseX: number
    let mouseY: number
    let windowWidth = 0
    let windowHeight = 0
    let draggable = true
    const handleMouseDown = async (e: MouseEvent) => {
      if (e.button !== 0) return
      draggable = true
      mouseX = e.clientX
      mouseY = e.clientY
      const windowSize = await window.electron.ipcRenderer.invoke('get-window-size')
      windowWidth = windowSize[0]
      windowHeight = windowSize[1]
      el.addEventListener('mouseup', handleMouseUp)
      animationId = requestAnimationFrame(handleMoveWindow)
    }
    const handleMouseUp = () => {
      draggable = false
      el.removeEventListener('mouseup', handleMouseUp)
      cancelAnimationFrame(animationId)
    }
    const handleMoveWindow = () => {
      window.electron.ipcRenderer.send('move-window', mouseX, mouseY, windowWidth, windowHeight)
      if (draggable) {
        animationId = requestAnimationFrame(handleMoveWindow)
      }
    }
    el.addEventListener('mousedown', handleMouseDown)
  }
}

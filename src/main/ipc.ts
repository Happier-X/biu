import { ipcMain, BrowserWindow, screen } from 'electron'
import { getApps } from './getApps'
import { exec } from 'child_process'

export function setupIpcHandlers(mainWindow: BrowserWindow): void {
  // 调整窗口大小
  ipcMain.on('resize-window', (_, height) => {
    mainWindow.setBounds({
      height
    })
  })
  // 获取窗口大小
  ipcMain.handle('get-window-size', () => {
    return mainWindow.getContentSize()
  })
  // 移动窗口
  ipcMain.on('move-window', (_, mouseX, mouseY, windowWidth, windowHeight) => {
    const { x, y } = screen.getCursorScreenPoint()
    mainWindow.setBounds({
      x: x - mouseX,
      y: y - mouseY,
      width: windowWidth,
      height: windowHeight
    })
  })
  // 获取下载的软件
  ipcMain.handle('get-download-apps', async () => {
    const res = await getApps()
    return res
  })
  // 打开软件
  ipcMain.on('open-app', (_, id) => {
    mainWindow.minimize()
    if (typeof id === 'object' && id.AppID) {
      // 如果接收到的是对象，提取 AppID
      id = id.AppID
    }
    const command = `explorer.exe shell:appsFolder\\${id}`
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`执行出错: ${error}`)
        return
      }
      if (stderr) {
        console.error(`stderr: ${stderr}`)
      }
      if (stdout) {
        console.log(`stdout: ${stdout}`)
      }
    })
  })
}

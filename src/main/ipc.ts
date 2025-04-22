import { ipcMain, BrowserWindow } from 'electron'

export function setupIpcHandlers(mainWindow: BrowserWindow): void {
  ipcMain.on('resize-window', (_, height) => {
    console.log('resize-window', height)
    mainWindow.setBounds({
      height
    })
  })
}

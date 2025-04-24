import path from 'path'
import fs from 'fs/promises'
import os from 'os'
import { shell } from 'electron'

// 系统快捷方式
const systemShortCut = path.resolve('C:\\ProgramData\\Microsoft\\Windows\\Start Menu')
// 用户级别快捷方式
const appData = path.join(os.homedir(), 'AppData\\Roaming')
const userShortCut = path.join(appData, 'Microsoft\\Windows\\Start Menu')
let appList = []
// 通过快捷方式获取软件列表
const getAppsByShortCut = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      await Promise.all([getShortCut(systemShortCut), getShortCut(userShortCut)])
      resolve(appList)
    } catch (error) {
      console.error('获取快捷方式失败', error)
      reject(error)
    }
  })
}

const getShortCut = async (dir) => {
  try {
    const files = await fs.readdir(dir)

    // 并行处理所有文件
    await Promise.all(
      files.map(async (file) => {
        const filePath = path.join(dir, file)

        try {
          const stats = await fs.stat(filePath)

          if (stats.isFile()) {
            if (path.extname(file) === '.lnk') {
              const appName = file.split('.')[0]

              try {
                const appDetails = await shell.readShortcutLink(filePath)

                if (!appDetails.target || appDetails.target.toLowerCase().includes('unin')) {
                  return
                }
                appList.push({
                  name: appName,
                  target: appDetails.target,
                  desc: appDetails.description,
                  details: appDetails
                })
              } catch (e) {
                console.error('获取快捷方式失败', e)
              }
            }
          } else if (stats.isDirectory()) {
            await getShortCut(filePath)
          }
        } catch (err) {
          console.error(`处理文件 ${filePath} 时出错:`, err)
        }
      })
    )
  } catch (err) {
    console.error(`读取目录 ${dir} 时出错:`, err)
  }
}

export { getAppsByShortCut }

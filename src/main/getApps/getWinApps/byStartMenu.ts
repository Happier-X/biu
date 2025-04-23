import { exec } from 'child_process'
import iconv from 'iconv-lite'
import { openApp } from 'open'

export async function getAppsByStartMenu() {
  return new Promise((resolve, reject) => {
    exec(
      'powershell -command "Get-StartApps | ConvertTo-Json"',
      { encoding: 'buffer' },
      (error, stdout) => {
        if (error) {
          return reject(error)
        }
        try {
          const decodedOutput = iconv.decode(stdout, 'cp936')
          const apps = JSON.parse(decodedOutput)
          // getAppIcon(apps[0].AppID)
          //   .then((iconPath) => {
          //     console.log('应用程序图标路径:', iconPath)
          //   })
          //   .catch((error) => {
          //     console.error('获取应用程序图标路径时出错:', error)
          //   })
          openApp(apps[0].AppID)
            .then((res) => {
              console.log(res)
            })
            .catch((error) => {
              console.error('打开应用程序时出错:', error)
            })
          resolve(apps)
        } catch (parseError) {
          reject(new Error('无法解析 PowerShell 输出'))
        }
      }
    )
  })
}

// // 获取应用程序的图标
// function getAppIcon(appId) {}
// // 获取应用程序的启动路径
// function getAppAction(appId) {}

// // 获取应用程序的图标
// function getAppIcon(appId) {
//   return new Promise((resolve, reject) => {
//     // PowerShell命令：获取应用的图标路径
//     exec(
//       `powershell -command "(Get-StartApps | Where-Object { $_.AppID -eq '${appId}' }).IconPath"`,
//       { encoding: 'buffer' },
//       (error, stdout) => {
//         if (error) {
//           return reject(error)
//         }

//         try {
//           const decodedOutput = iconv.decode(stdout, 'cp936').trim()

//           // 处理可能的返回值
//           if (!decodedOutput || decodedOutput === '') {
//             return resolve(null) // 没有图标路径
//           }

//           // 清理路径字符串
//           const iconPath = decodedOutput.replace(/^@{IconPath=|}$/g, '')

//           // 检查是否是系统路径或可执行文件
//           if (iconPath.endsWith('.exe') || iconPath.endsWith('.dll')) {
//             return resolve(iconPath)
//           }

//           // 其他情况直接返回路径
//           resolve(iconPath)
//         } catch (parseError) {
//           reject(parseError)
//         }
//       }
//     )
//   })
// }

// // 获取应用程序的启动路径
// function getAppAction(appId) {
//   return new Promise((resolve, reject) => {
//     // 更复杂的PowerShell命令获取应用的真实路径
//     exec(
//       `powershell -command `
//       + `"$app = Get-StartApps | Where-Object { $_.AppID -eq '${appId}' }; `
//       + `if ($app) { `
//       + `$shell = New-Object -ComObject WScript.Shell; `
//       + `$shortcut = $shell.CreateShortcut((Join-Path $env:APPDATA 'Microsoft\\Windows\\Start Menu\\Programs\\' + ($app.Name -replace '[\\\\/:*?\"<>|]', ' ') + '.lnk')); `
//       + `$shortcut.TargetPath }"`,
//       { encoding: 'buffer' },
//       (error, stdout) => {
//         if (error) {
//           return reject(error)
//         }

//         try {
//           const decodedOutput = iconv.decode(stdout, 'cp936').trim()

//           // 如果找不到路径，尝试另一种方法
//           if (!decodedOutput || decodedOutput === '') {
//             return getAppActionFallback(appId)
//               .then(resolve)
//               .catch(reject)
//           }

//           resolve(decodedOutput)
//         } catch (parseError) {
//           reject(parseError)
//         }
//       }
//     )
//   })
// }

// // 备用方法获取启动路径
// function getAppActionFallback(appId) {
//   return new Promise((resolve, reject) => {
//     // 尝试从注册表中获取信息
//     exec(
//       `powershell -command `
//       + `"$app = Get-StartApps | Where-Object { $_.AppID -eq '${appId}' }; `
//       + `if ($app) { `
//       + `$allStartMenuItems = Get-ChildItem (Join-Path $env:APPDATA 'Microsoft\\Windows\\Start Menu\\Programs\\') -Recurse -Filter '*.lnk'; `
//       + `foreach ($item in $allStartMenuItems) { `
//       + `if ($item.Name -replace '[\\\\/:*?\"<>|]', ' ' -like '*'+$app.Name+'*') { `
//       + `$shell = New-Object -ComObject WScript.Shell; `
//       + `$shortcut = $shell.CreateShortcut($item.FullName); `
//       + `return $shortcut.TargetPath } } }"`,
//       { encoding: 'buffer' },
//       (error, stdout) => {
//         if (error) {
//           return reject(error)
//         }

//         const decodedOutput = iconv.decode(stdout, 'cp936').trim()

//         if (!decodedOutput || decodedOutput === '') {
//           return resolve(null) // 无法确定路径
//         }

//         resolve(decodedOutput)
//       }
//     )
//   })
// }

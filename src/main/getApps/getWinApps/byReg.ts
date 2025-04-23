// import { exec } from 'child_process'

// /**
//  * 通过注册表获取 Windows 应用程序
//  */
// export const getWinAppsByReg = async () => {
//   const regPaths = [
//     'HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall',
//     'HKLM\\SOFTWARE\\WOW6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall',
//     'HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall'
//   ]
//   return new Promise((resolve, reject) => {
//     const promises = regPaths.map((path) => getRegValue(path))
//     Promise.all(promises)
//       .then((res) => {
//         const apps = res.flat()
//         resolve(apps)
//       })
//       .catch((error) => {
//         reject(error)
//       })
//   })
// }

// const getRegValue = (path: string) => {
//   return new Promise((resolve, reject) => {
//     exec(`reg query "${path}" /s`, (error, stdout) => {
//       if (error) {
//         if (error.message.includes('The system was unable to find')) {
//           return resolve([])
//         }
//         return reject(error)
//       }
//       const apps = parseRegOutput(stdout)
//       resolve(apps)
//     })
//   })
// }

// const parseRegOutput = (output) => {
//   const apps = []
//   const entries = output.split(/\r?\n\r?\n/) // 按空行分割不同软件条目

//   for (const entry of entries) {
//     if (!entry.trim()) continue

//     const lines = entry.split('\r\n').filter((line) => line.trim())
//     if (lines.length < 2) continue

//     const appKey = lines[0].trim()
//     const properties = {}

//     for (let i = 1; i < lines.length; i++) {
//       const line = lines[i].trim()
//       const match = line.match(/^\s*(.+?)\s+REG_[A-Z]+\s+(.+)$/)
//       if (match) {
//         const [_, name, value] = match
//         properties[name] = value
//       }
//     }

//     if (properties.DisplayName) {
//       apps.push({
//         key: appKey,
//         name: properties.DisplayName,
//         version: properties.DisplayVersion || 'Unknown',
//         publisher: properties.Publisher || 'Unknown',
//         installDate: properties.InstallDate || null,
//         installLocation: properties.InstallLocation || null,
//         uninstallString: properties.UninstallString || null,
//         estimatedSize: properties.EstimatedSize || null,
//         registryPath: appKey
//       })
//     }
//   }
//   console.log('通过注册表获取到的软件:', apps)
//   return apps
// }

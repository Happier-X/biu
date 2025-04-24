import { exec } from 'child_process'
import iconv from 'iconv-lite'

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
          resolve(apps)
        } catch (parseError) {
          reject(new Error('无法解析 PowerShell 输出'))
        }
      }
    )
  })
}

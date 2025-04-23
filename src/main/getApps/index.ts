import { getWinApps } from './getWinApps'
export async function getApps() {
  if (process.platform === 'win32') {
    return await getWinApps()
  }
  return []
}

import { getAppsByShortCut } from './byShortCut'

export async function getWinApps() {
  return await getAppsByShortCut()
}

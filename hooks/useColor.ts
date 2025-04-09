import { Colors } from '@/constants/Colors'
import { useSettingStore } from '@/store'

type Config = {
  inverse?: boolean
  mode?: 'light' | 'dark'
}

export function useColor(
  name: keyof typeof Colors.light & keyof typeof Colors.dark,
  config?: Config
) {
  const { mode: curMode } = useSettingStore()
  let finallyMode = config?.mode ?? curMode
  if (config?.inverse) {
    finallyMode = finallyMode === 'light' ? 'dark' : 'light'
  }
  const curColors = Colors[finallyMode]
  return curColors[name]
}

export function useColors(
  names: (keyof typeof Colors.light & keyof typeof Colors.dark)[],
  config?: Config
) {
  const { mode: curMode } = useSettingStore()
  let finallyMode = config?.mode ?? curMode
  if (config?.inverse) {
    finallyMode = finallyMode === 'light' ? 'dark' : 'light'
  }
  const curColors = Colors[finallyMode]
  return names.map((name) => curColors[name])
}

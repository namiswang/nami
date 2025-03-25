import { Colors } from '@/constants/Colors'
import { useSettingStore } from '@/store'

export function useColor(
  name: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const { mode } = useSettingStore()
  const curColors = Colors[mode]
  return curColors[name]
}

export function useColors(
  names: (keyof typeof Colors.light & keyof typeof Colors.dark)[]
) {
  const { mode } = useSettingStore()
  const curColors = Colors[mode]
  return names.map((name) => curColors[name])
}

import { Colors } from '@/constants/Colors'
import { useColorScheme } from 'react-native'

export function useThemeColor(
  name: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme() ?? 'light'
  const curColors = Colors[theme]
  return curColors[name]
}

export function useThemeColors(
  names: (keyof typeof Colors.light & keyof typeof Colors.dark)[]
) {
  const theme = useColorScheme() ?? 'light'
  const curColors = Colors[theme]
  return names.map((name) => curColors[name])
}

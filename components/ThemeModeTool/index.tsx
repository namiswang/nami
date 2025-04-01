import React from 'react'
import { ViewStyle } from 'react-native'
import { JButton } from '@/components/JButton'
import { IconSymbol } from '@/components/IconSymbol'
import { useSettingStore } from '@/store'
import { JView } from '@/components/JView'

interface Props {
  style?: ViewStyle
}

export const ThemeModeTool = React.memo<Props>(({ style }) => {
  const { mode, setMode } = useSettingStore()

  return (
    <JView style={style}>
      <JButton
        width={20}
        height={20}
        variant="text"
        text={<IconSymbol name={mode === 'dark' ? 'sun.max' : 'moon'} size={20} />}
        onPress={() => {
          setMode(mode === 'dark' ? 'light' : 'dark') // 切换模式
        }}
      />
    </JView>
  )
})

import React from 'react'
import { View, ViewStyle } from 'react-native'
import { JButton } from '@/components/ui/JButton'
import { IconSymbol } from '@/components/ui/IconSymbol'
import { useSettingStore } from '@/store'

interface Props {
  style?: ViewStyle
}

export const DarkModeTool = React.memo<Props>(({ style }) => {
  const { mode, setMode } = useSettingStore()

  return (
    <View style={style}>
      <JButton
        width={20}
        height={20}
        text={<IconSymbol name={mode === 'dark' ? 'sun.max' : 'moon'} size={20} />}
        onPress={() => {
          setMode(mode === 'dark' ? 'light' : 'dark') // 切换模式
        }}
      />
    </View>
  )
})

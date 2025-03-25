import React, { useMemo } from 'react'
import { StyleSheet } from 'react-native'
import { JView } from '@/components/ui/JView'
import { JButton } from '@/components/ui/JButton'
import { IconSymbol } from '@/components/ui/IconSymbol'
import { useSettingStore } from '@/store'

export const DarkModeTool = React.memo(() => {
  const { mode, setMode } = useSettingStore()

  return (
    <JView style={styles.darkModeTool}>
      <JButton
        width={20}
        height={20}
        text={<IconSymbol name={mode === 'dark' ? 'sun.max' : 'moon'} size={20} />}
        onPress={() => {
          setMode(mode === 'dark' ? 'light' : 'dark') // 切换模式
        }}
      />
    </JView>
  )
})

const styles = StyleSheet.create({
  darkModeTool: {
    position: 'absolute',
    top: 60,
    right: 20
  }
})

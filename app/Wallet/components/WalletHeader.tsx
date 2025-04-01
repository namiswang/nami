import React from 'react'
import { JView } from '@/components/JView'
import { JText } from '@/components/JText'
import { JButton } from '@/components/JButton'
import { IconSymbol } from '@/components/IconSymbol'
import { ThemeModeTool } from '@/components/ThemeModeTool'
import { useColor } from '@/hooks/useColor'

export default function WalletHeader() {
  const headerBackground = useColor('elevatedBackground')

  return <JView style={{
    justifyContent: 'flex-end',
    height: 100,
    paddingHorizontal: 10,
    paddingBottom: 5,
    backgroundColor: headerBackground
  }}>
    <JView style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <JView style={{ width: '25%' }}>
        <JButton
          width={20}
          height={20}
          variant="text"
          text={<IconSymbol name="text.justify" size={24} />}
          onPress={() => void 0}
        />
      </JView>

      <JView row align="center">
        <JText bold size={16} marginRight={4}>资产管理</JText>
      </JView>

      <JView style={{ width: '25%', flexDirection: 'row', justifyContent: 'flex-end' }}>
        <ThemeModeTool />
      </JView>
    </JView>
  </JView>
}
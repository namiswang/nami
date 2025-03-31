import { JText } from '@/components/ui/JText'
import { JButton } from '@/components/ui/JButton'
import { IconSymbol } from '@/components/ui/IconSymbol'
import React from 'react'
import { ThemeModeTool } from '@/components/ThemeModeTool'
import { JView } from '@/components/ui/JView'
import { useColor } from '@/hooks/useColor'

export function WalletHeader() {
  const headerBackground = useColor('elevatedBackground')

  return <JView style={{
    justifyContent: 'flex-end',
    height: 100,
    paddingHorizontal: 10,
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
          text={<IconSymbol name="text.justify" size={20} />}
          onPress={() => void 0}
        />
      </JView>

      <JView>
        <JText>资产管理</JText>
      </JView>

      <JView style={{ width: '25%', flexDirection: 'row', justifyContent: 'flex-end' }}>
        <ThemeModeTool />
      </JView>
    </JView>
  </JView>
}
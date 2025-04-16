import React from 'react'
import { JText } from '@/components/JText'
import { JButton } from '@/components/JButton'
import { IconSymbol } from '@/components/IconSymbol'
import { ThemeModeTool } from '@/components/ThemeModeTool'
import HeaderLayout from '@/components/HeaderLayout'

export default function WalletHeader() {
  return (
    <HeaderLayout
      left={
        <JButton
          width={20}
          height={20}
          variant="text"
          text={<IconSymbol name="text.justify" size={24} />}
          onPress={() => void 0}
        />
      }
      middle={<JText bold size={16}>资产管理</JText>}
      right={<ThemeModeTool />}
    />
  )
}
import { JText } from '@/components/ui/JText'
import { View } from 'react-native'
import { JButton } from '@/components/ui/JButton'
import { IconSymbol } from '@/components/ui/IconSymbol'
import React from 'react'
import { DarkModeTool } from '@/components/DarkModeTool'

export function WalletHeader() {
  return <View style={{
    justifyContent: 'flex-end',
    height: 100,
    paddingHorizontal: 10,
    backgroundColor: '#ccc'
  }}>
    <View style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <View style={{ width: '25%' }}>
        <JButton
          width={20}
          height={20}
          text={<IconSymbol name="text.justify" size={20} />}
          onPress={() => void 0}
        />
      </View>

      <View>
        <JText>资产管理</JText>
      </View>

      <View style={{ width: '25%', flexDirection: 'row', justifyContent: 'flex-end' }}>
        <DarkModeTool />
      </View>
    </View>
  </View>
}
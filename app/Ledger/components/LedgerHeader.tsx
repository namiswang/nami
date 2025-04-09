import { IconSymbol } from '@/components/IconSymbol'
import { useNavigation } from '@react-navigation/native'
import HeaderLayout from '@/components/HeaderLayout'
import { JButton } from '@/components/JButton'
import React from 'react'

export default function LedgerHeader() {
  const navigation = useNavigation()

  return (
    <HeaderLayout
      showBack
      title="账本"
      right={
        <JButton
          width={20}
          height={20}
          variant="text"
          text={<IconSymbol name="plus.app.fill" size={24} />}
          // onPress={() => navigation.navigate('LedgerEditor')}
        />
      }
    />
  )
}
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { JText } from '@/components/JText'
import { JButton } from '@/components/JButton'
import { IconSymbol } from '@/components/IconSymbol'
import { useDrawerStore } from '@/store'
import MenuSider from '@/components/MenuSider'
import HeaderLayout from '@/components/HeaderLayout'

export default function BillHeader() {
  const navigation = useNavigation<any>()
  const { setDrawerContent, setDrawerOptions } = useDrawerStore()

  return (
    <HeaderLayout
      left={
        <JButton
          width={20}
          height={20}
          variant="text"
          text={<IconSymbol name="text.justify" size={24} />}
          onPress={() => {
            setDrawerOptions({
              drawerType: 'front',
              drawerPosition: 'left',
              drawerStyle: { width: 300 }
            })
            setDrawerContent(<MenuSider />)
            navigation.openDrawer()
          }}
        />
      }
      middle={
        <>
          <JText bold size={16} marginRight={4}>
            2025-01-01
          </JText>
          <IconSymbol name="chevron.down" size={16} />
        </>
      }
      right={
        <>
          <JButton
            width={20}
            height={20}
            variant="text"
            text={<IconSymbol name="calendar" size={24} />}
            onPress={() => void 0}
          />
          <JButton
            width={20}
            height={20}
            style={{ marginLeft: 10 }}
            variant="text"
            text={<IconSymbol name="chart.line.uptrend.xyaxis" size={24} />}
            onPress={() => void 0}
          />
        </>
      }
    />
  )
}

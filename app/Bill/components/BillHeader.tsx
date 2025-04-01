import React, { useContext } from 'react'
import { useNavigation } from '@react-navigation/native'
import { JText } from '@/components/JText'
import { JButton } from '@/components/JButton'
import { IconSymbol } from '@/components/IconSymbol'
import { JView } from '@/components/JView'
import { useColor } from '@/hooks/useColor'
import { useDrawerStore } from '@/store'

export function BillHeader() {
  const navigation = useNavigation<any>()
  const { setDrawerContent, setDrawerOptions } = useDrawerStore()
  const headerBackground = useColor('elevatedBackground')

  return (
    <JView
      style={{
        justifyContent: 'flex-end',
        height: 100,
        paddingHorizontal: 10,
        paddingBottom: 5,
        backgroundColor: headerBackground
      }}
    >
      <JView
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <JView style={{ width: '25%' }}>
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
              setDrawerContent(<JText>menu drawer</JText>)
              navigation.openDrawer()
            }}
          />
        </JView>

        <JView row align="center">
          <JText bold size={16} marginRight={4}>
            2025-01-01
          </JText>
          <IconSymbol name="chevron.down" size={16} />
        </JView>

        <JView
          style={{
            width: '25%',
            flexDirection: 'row',
            justifyContent: 'flex-end'
          }}
        >
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
        </JView>
      </JView>
    </JView>
  )
}

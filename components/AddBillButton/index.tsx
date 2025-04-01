import React from 'react'
import { Dimensions } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { HapticTab } from '@/components/HapticTab'
import { IconSymbol } from '@/components/IconSymbol'
import { useDrawerStore } from '@/store'
import BillEditor from '@/app/BillEditor'

interface Props {
}

export function AddBillButton(props: Props) {
  const navigation = useNavigation<any>()
  const { setDrawerContent, setDrawerOptions } = useDrawerStore()

  const { width } = Dimensions.get('window')

  return (
    <HapticTab
      {...props}
      onPress={() => {
        setDrawerOptions({
          drawerType: 'slide',
          drawerPosition: 'right',
          drawerStyle: { width }
        })
        setDrawerContent(<BillEditor />)
        navigation.openDrawer()
      }}
    >
      <IconSymbol name="plus.circle.fill" size={50} />
    </HapticTab>
  )
}
import { Tabs } from 'expo-router'
import React from 'react'
import { Platform } from 'react-native'
import { HapticTab } from '@/components/HapticTab'
import { IconSymbol } from '@/components/ui/IconSymbol'
import TabBarBackground from '@/components/ui/TabBarBackground'
import { Colors } from '@/constants/Colors'
import { useSettingStore } from '@/store'
import { BillHeader } from '@/components/headers/BillHeader'
import { WalletHeader } from '@/components/headers/WalletHeader'
import * as Haptics from 'expo-haptics'
import { JButton } from '@/components/ui/JButton'
import { JView } from '@/components/ui/JView'

export default function TabLayout() {
  const { mode } = useSettingStore()

  return (
    <JView>
      <Tabs
        screenOptions={{
          tabBarButton: HapticTab,
          tabBarBackground: TabBarBackground,
          tabBarStyle: Platform.select({
            ios: {
              position: 'absolute'
            },
            default: {}
          })
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: '账单',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
            header: () => <BillHeader />,
            tabBarItemStyle: {
              transform: [{ translateX: -30 }]
            }
          }}
        />

        <Tabs.Screen
          name="wallet"
          options={{
            title: '资产',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="creditcard.fill" color={color} />,
            header: () => <WalletHeader />,
            tabBarItemStyle: {
              transform: [{ translateX: 30 }]
            }
          }}
        />
      </Tabs>

      <JButton
        type="primary"
        style={{
          position: 'absolute',
          bottom: 30,
          left: '50%',
          width: 44,
          height: 44,
          transform: [{ translateX: -22 }],
          borderRadius: '50%'
        }}
        text={<IconSymbol size={32} name="plus" color={Colors[mode === 'dark' ? 'light' : 'dark'].text} />}
        onPress={() => {
          if (process.env.EXPO_OS === 'ios') {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
          }
        }}
      />
    </JView>
  )
}
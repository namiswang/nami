import { Tabs } from 'expo-router'
import React from 'react'
import { Platform, View } from 'react-native'
import { useColorScheme } from 'react-native'
import { HapticTab } from '@/components/HapticTab'
import { IconSymbol } from '@/components/ui/IconSymbol'
import TabBarBackground from '@/components/ui/TabBarBackground'
import { Colors } from '@/constants/Colors'
import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs/src/types'

interface Tab {
  name: string
  title: string
  tabBarIcon: BottomTabNavigationOptions['tabBarIcon']
}

export default function TabLayout() {
  const colorScheme = useColorScheme()

  const tabs: Tab[] = [
    {
      name: 'index',
      title: '账单',
      tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />
    },
    {
      name: 'add',
      title: '',
      tabBarIcon: ({ color }) => (
        <View style={{ marginTop: 10 }}>
          <IconSymbol size={40} name="plus.circle.fill" color={color} />
        </View>)
    },
    {
      name: 'explore',
      title: '资产',
      tabBarIcon: ({ color }) => <IconSymbol size={28} name="creditcard.fill" color={color} />
    }
  ]

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute' // 在iOS上使用透明背景来显示模糊效果
          },
          default: {}
        })
      }}
    >
      {tabs.map(({ name, title, tabBarIcon }, index) => (
        <Tabs.Screen
          key={index}
          name={name}
          options={{
            title,
            tabBarIcon
          }}
        />
      ))}
    </Tabs>
  )
}

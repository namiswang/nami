import React from 'react'
import { JView } from '@/components/JView'
import { useDrawerStore } from '@/store'

export default function DynamicDrawer() {
  const { drawerContent } = useDrawerStore()

  return (
    <JView
      themed
      paddingHorizontal={30}
      paddingVertical={80}
      flex={1}
    >
      {drawerContent}
    </JView>
  )
}

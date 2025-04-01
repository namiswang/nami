import React, { useEffect } from 'react'
import { JView } from '@/components/JView'
import { ReactNode } from 'react'
import { useDrawerStore } from '@/store'

interface Props {
  content: ReactNode
}

export function DynamicDrawer({ content }: Props) {
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

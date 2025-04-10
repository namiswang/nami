import React from 'react'
import { RouteProp, useRoute } from '@react-navigation/native'
import HeaderLayout from '@/components/HeaderLayout'
import { LedgerEditorRouteParams } from '@/app/LedgerEditor'

export default function LedgerEditorHeader() {
  const route = useRoute<RouteProp<{ LedgerEditor: LedgerEditorRouteParams }, 'LedgerEditor'>>()
  const params = route.params

  return (
    <HeaderLayout
      showBack
      title={params?.id ? '编辑账本' : '新增账本'}
    />
  )
}
import React from 'react'
import { RouteProp, useRoute } from '@react-navigation/native'
import HeaderLayout from '@/components/HeaderLayout'
import { LedgerEditorRouteParams } from '@/app/LedgerEditor'
import { useTranslation } from 'react-i18next'

export default function LedgerEditorHeader() {
  const { t } = useTranslation()
  const route = useRoute<RouteProp<{ LedgerEditor: LedgerEditorRouteParams }, 'LedgerEditor'>>()
  const params = route.params

  return (
    <HeaderLayout
      showBack
      title={params?.id ? t('ledger.editLedger') : t('ledger.addLedger')}
    />
  )
}
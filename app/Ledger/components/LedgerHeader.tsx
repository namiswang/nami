import React, { useMemo, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { IconSymbol } from '@/components/IconSymbol'
import HeaderLayout from '@/components/HeaderLayout'
import { JButton } from '@/components/JButton'
import { LedgerNavigationProp } from '@/app/Ledger'
import { JSheet } from '@/components/JSheet'
import { JText } from '@/components/JText'
import { JInput } from '@/components/JInput'
import { useTranslation } from 'react-i18next'

export default function LedgerHeader() {
  const [visible, setVisible] = useState(false)
  const [sheetType, setSheetType] = useState<'select' | 'join'>('select')
  const [code, setCode] = useState<string>('')
  const navigation = useNavigation<LedgerNavigationProp>()

  const { t } = useTranslation()

  const handleJoinLedger = () => {
  }

  const children = useMemo(() => {
    if (sheetType === 'select')
      return (
        <>
          <JButton
            height={60}
            text={t('ledger.addLedger')}
            onPress={() => {
              setVisible(false)
              setTimeout(() => {
                navigation.navigate('LedgerEditor')
              }, 300)
            }}
          />

          <JButton
            style={{ width: '100%' }}
            type="primary"
            height={60}
            text={t('ledger.joinLedger')}
            onPress={() => {
              setSheetType('join')
            }}
          />
        </>
      )

    return (
      <>
        <JText size={16} bold style={{ marginBottom: 20 }}>
          {t('ledger.joinLedger')}
        </JText>

        <JInput
          value={code}
          clearable={false}
          placeholder={t('ledger.inputInviteCode')}
          containerStyle={{ width: '100%' }}
          inputContainerStyle={{ paddingRight: 0 }}
          inputStyle={{ color: '#687076' }}
          onChange={setCode}
          onPointerEnter={handleJoinLedger}
        />

        <JButton type="primary" text={t('ledger.joinLedger')} onPress={handleJoinLedger} />
      </>
    )
  }, [sheetType])

  return (
    <HeaderLayout
      showBack
      title={t('ledger.ledger')}
      right={(
        <JSheet
          value={visible}
          onChange={(visible) => {
            setVisible(visible)
            setCode('')
            setSheetType('select')
          }}
          trigger={<IconSymbol name="plus.app.fill" size={24} />}
          children={children}
        />
      )}
    />
  )
}
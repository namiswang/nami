import React, { useEffect, useRef } from 'react'
import { TouchableOpacity } from 'react-native'
import ActionSheet, { ActionSheetRef } from 'react-native-actions-sheet'
import { useColor } from '@/hooks/useColor'
import { JView } from '@/components/JView'

interface Props {
  trigger: React.ReactNode
  value: boolean
  onChange?: (value: boolean) => void
  children?: React.ReactNode
}

export function JSheet({ trigger, value, onChange, children }: Props) {
  const actionSheetRef = useRef<ActionSheetRef>(null)

  const backgroundColor = useColor('pageBackground')

  useEffect(() => {
    if (!value) {
      actionSheetRef.current?.hide()
    } else {
      actionSheetRef.current?.show()
    }
  }, [value])

  return (
    <>
      <TouchableOpacity
        style={{ flexDirection: 'row' }}
        onPress={() => onChange?.(true)}
      >
        {trigger}
      </TouchableOpacity>

      <ActionSheet
        ref={actionSheetRef}
        onClose={() => onChange?.(false)}
        containerStyle={{
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          backgroundColor
        }}
      >
        <JView themed padding={16} paddingBottom={32}>
          {children}
        </JView>
      </ActionSheet>
    </>
  )
}

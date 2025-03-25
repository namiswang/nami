import { useRef, useState } from 'react'
import { TextInput } from 'react-native'
import { router, useLocalSearchParams } from 'expo-router'
import { useTranslation } from 'react-i18next'
import { AuthLayout } from '@/components/AuthLayout'
import { JButton } from '@/components/ui/JButton'
import { JInput } from '@/components/ui/JInput'

export default function Verify() {
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState<string | undefined>()

  const inputRef = useRef<TextInput>(null)

  const { t } = useTranslation()
  const {username} = useLocalSearchParams()

  const continueHandler = () => {
    if (!password) {
      setErrorMsg(t('login.verifyTip'))
      inputRef.current?.focus()
      return
    }
    console.log(11111, 'username', username)
    router.replace('/(tabs)')
  }

  return (
    <AuthLayout title={t('login.title')}>
      <JInput
        ref={inputRef}
        secure
        value={password}
        onChange={(value) => {
          setPassword(value)
          setErrorMsg(undefined)
        }}
        placeholder={t('login.password')}
        error={errorMsg}
      />

      <JButton
        type="primary"
        text={t('login.continue')}
        onPress={continueHandler}
      />

      <JButton
        text={t('login.back')}
        onPress={router.back}
      />
    </AuthLayout>
  )
}
import { useState, useRef } from 'react'
import { TextInput } from 'react-native'
import { router } from 'expo-router'
import { useTranslation } from 'react-i18next'
import { AuthLayout } from '@/components/AuthLayout'
import { JButton } from '@/components/JButton'
import { JInput } from '@/components/JInput'

export default function Identify() {
  const [username, setUsername] = useState('')
  const [errorMsg, setErrorMsg] = useState<string>()

  const inputRef = useRef<TextInput>(null)

  const { t } = useTranslation()

  const continueHandler = () => {
    if (!username) {
      setErrorMsg(t('login.identifyTip'))
      inputRef.current?.focus()
      return
    }
    router.push({
      pathname: '/Verify',
      params: { username }
    })
  }

  return (
    <AuthLayout title={t('login.title')}>
      <JInput
        ref={inputRef}
        value={username}
        onChange={(value) => {
          setUsername(value)
          setErrorMsg(undefined)
        }}
        placeholder={t('login.username')}
        error={errorMsg}
      />

      <JButton
        type="primary"
        text={t('login.continue')}
        onPress={continueHandler}
      />
    </AuthLayout>
  )
} 
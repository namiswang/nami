import { useRef, useState } from 'react'
import { router } from 'expo-router'
import { useTranslation } from 'react-i18next'
import { AuthLayout } from '@/components/AuthLayout'
import { JButton } from '@/components/ui/JButton'
import { JInput } from '@/components/ui/JInput'
import { JMessage } from '@/components/ui/JToast'

export default function Verify() {
  const [password, setPassword] = useState('')

  const inputRef = useRef<any>(null)

  const { t } = useTranslation()

  const continueHandler = () => {
    if (!password) {
      JMessage.error('请输入密码')
      inputRef.current?.focus()
      return
    }
    router.replace('/(tabs)')
  }

  return (
    <AuthLayout title={t('login.title')}>
      <JInput
        ref={inputRef}
        value={password}
        onChange={setPassword}
        placeholder={t('login.password')}
        secure
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
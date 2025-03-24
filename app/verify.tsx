import { useRef, useState } from 'react'
import { router } from 'expo-router'
import { useTranslation } from 'react-i18next'
import { AuthLayout } from '@/components/AuthLayout'
import Button from '@/components/ui/JButton'
import JInput from '@/components/ui/JInput'
import Message from '@/components/ui/JToast'

export default function Verify() {
  const [password, setPassword] = useState('')

  const inputRef = useRef<any>(null)

  const { t } = useTranslation()

  const continueHandler = () => {
    if (!password) {
      Message.error('请输入密码')
      inputRef.current?.focus()
      return
    }
    router.push('/(tabs)')
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

      <Button
        type="primary"
        text={t('login.continue')}
        onPress={continueHandler}
      />

      <Button
        text={t('login.back')}
        onPress={router.back}
      />
    </AuthLayout>
  )
}
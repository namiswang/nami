import { useState, useRef } from 'react'
import { router } from 'expo-router'
import { useTranslation } from 'react-i18next'
import { AuthLayout, styles } from '@/components/AuthLayout'
import Button from '@/components/ui/JButton'
import JInput from '@/components/ui/JInput'
import Message from '@/components/ui/JToast'

export default function Identify() {
  const [username, setUsername] = useState('')

  const inputRef = useRef<any>(null)

  const { t } = useTranslation()

  const continueHandler = () => {
    if (!username) {
      Message.error('请输入用户名')
      inputRef.current?.focus()
      return
    }
    router.push({
      pathname: '/verify',
      params: { username }
    })
  }

  return (
    <AuthLayout title={t('login.title')}>
      <JInput
        ref={inputRef}
        value={username}
        onChange={setUsername}
        placeholder={t('login.username')}
      />

      <Button
        type="primary"
        text={t('login.continue')}
        onPress={continueHandler}
      />
    </AuthLayout>
  )
} 
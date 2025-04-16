import React, { useState } from 'react'
import { Pressable, TouchableOpacity } from 'react-native'
import { JText } from '@/components/JText'
import { JView } from '@/components/JView'
import * as Clipboard from 'expo-clipboard'
import { IconSymbol } from '@/components/IconSymbol'
import { JMessage } from '../JMessage'

interface JCopyProps {
  displayText: string
  copyText: string
  copiedText?: string
  children?: React.ReactNode
  style?: any
  onCopy?: () => void
}

export function JCopy({
  displayText,
  copyText,
  copiedText = '已复制',
  children,
  style,
  onCopy
}: JCopyProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      if (copied) return
      await Clipboard.setStringAsync(copyText)
      setCopied(true)
      onCopy?.()
      // 3秒后重置状态
      setTimeout(() => {
        setCopied(false)
      }, 3000)
    } catch (error) {
      JMessage.error('复制失败')
    }
  }

  if (children) {
    return (
      <TouchableOpacity onPress={handleCopy}>
        {children}
      </TouchableOpacity>
    )
  }

  return (
    <TouchableOpacity onPress={handleCopy}>
      <JView
        row
        align="center"
        style={[{ padding: 8 }, style]}
      >
        <JText color={copied ? '#16A34A' : undefined}>
          {copied ? copiedText : displayText}
        </JText>
        <IconSymbol
          name={copied ? 'checkmark.circle' : 'doc.on.doc'}
          size={16}
          style={{ marginLeft: 4 }}
          color={copied ? '#16A34A' : undefined}
        />
      </JView>
    </TouchableOpacity>
  )
}
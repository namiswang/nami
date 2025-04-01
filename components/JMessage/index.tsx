import React from 'react'
import Toast from 'react-native-toast-message'
import { StyleSheet } from 'react-native'
import { IconSymbol, IconSymbolName } from '../IconSymbol'
import { ToastShowParams } from 'react-native-toast-message/lib/src/types'
import { JText } from '@/components/JText'
import { JView } from '@/components/JView'

const config = {
  success: {
    backgroundColor: 'rgba(52, 199, 89, 0.9)',
    icon: 'checkmark.circle.fill'
  },
  error: {
    backgroundColor: 'rgba(255, 59, 48, 0.9)',
    icon: 'xmark.circle.fill'
  },
  warning: {
    backgroundColor: 'rgba(255, 149, 0, 0.9)',
    icon: 'exclamationmark.triangle.fill'
  },
  info: {
    backgroundColor: 'rgba(0, 122, 255, 0.9)',
    icon: 'info.circle.fill'
  }
}

interface CustomToastProps {
  text1: string
  props: {
    backgroundColor: string
    icon: IconSymbolName
  }
}

export class JMessage {
  static show(
    message: string,
    type: 'success' | 'error' | 'warning' | 'info' = 'info',
    options: ToastShowParams = {}
  ) {
    const { backgroundColor, icon } = config[type]

    Toast.show({
      type: 'success',
      text1: message,
      position: 'top',
      visibilityTime: type === 'error' ? 4000 : 2000,
      autoHide: true,
      topOffset: 50,
      bottomOffset: 50,
      props: {
        backgroundColor,
        icon
      },
      ...options
    })
  }

  static info(message: string, options?: ToastShowParams) {
    this.show(message, 'info', options)
  }

  static success(message: string, options?: ToastShowParams) {
    this.show(message, 'success', options)
  }

  static warning(message: string, options?: ToastShowParams) {
    this.show(message, 'warning', options)
  }

  static error(message: string, options?: ToastShowParams) {
    this.show(message, 'error', options)
  }
}

export function CustomToast({ text1, props }: CustomToastProps) {
  return (
    <JView style={[styles.container, { backgroundColor: props.backgroundColor }]}>
      <IconSymbol name={props.icon} size={20} color="#fff" />
      <JText style={styles.text}>{text1}</JText>
    </JView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  text: {
    color: '#fff',
    fontSize: 15,
    lineHeight: 20,
    marginLeft: 8
  }
})

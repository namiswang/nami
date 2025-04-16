import React, { ReactNode } from 'react'
import { JView } from '@/components/JView'
import { useColor } from '@/hooks/useColor'
import { IconSymbol } from '@/components/IconSymbol'
import { useNavigation } from '@react-navigation/native'
import { JButton } from '@/components/JButton'
import { JText } from '@/components/JText'

interface Props {
  left?: ReactNode
  middle?: ReactNode
  right?: ReactNode
  showBack?: boolean
  title?: string
}

export default function HeaderLayout({
  left,
  middle,
  right,
  showBack = false,
  title = ''
}: Props) {
  const headerBackground = useColor('elevatedBackground')
  const navigation = useNavigation()

  return (
    <JView height={100} justify="flex-end" paddingHorizontal={10} paddingBottom={5} background={headerBackground}>
      <JView row justify="space-between" align="center">
        {showBack && (
          <JButton
            width={20}
            height={20}
            variant="text"
            text={<IconSymbol name="chevron.left" size={24} />}
            onPress={() => navigation.goBack()}
          />
        )}

        <JView row align="center" justify="flex-start" style={{ width: '25%' }}>
          {title && <JText bold size={16} marginRight={4}>
            {title}
          </JText>}

          {left}
        </JView>

        <JView row align="center" justify="center" style={{ width: '25%' }}>
          {middle}
        </JView>

        <JView row align="center" justify="flex-end" style={{ width: '25%' }}>
          {right}
        </JView>
      </JView>
    </JView>
  )
}

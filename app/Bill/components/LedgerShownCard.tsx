import React from 'react'
import { ImageBackground, Pressable, StyleSheet } from 'react-native'
import { JView } from '@/components/JView'
import { JText } from '@/components/JText'
import { IconSymbol } from '@/components/IconSymbol'
import { Colors } from '@/constants/Colors'
import { useTranslation } from 'react-i18next'
import { useNavigation } from '@react-navigation/native'

export default function LedgerShownCard() {
  const { t } = useTranslation()
  const navigation = useNavigation<any>()

  const color = Colors.dark.text

  return (
    <Pressable onPress={() => navigation.navigate('Ledger')}>
      <ImageBackground
        source={require('@/assets/images/partial-react-logo.png')}
        style={styles.container}
      >
        <JView style={styles.header}>
          <JView style={styles.balanceInfo}>
            <JText size={12} color={color}>{t('ledger.monthlyBalance')}</JText>
            <JText bold size={24} marginTop={2} color={color}>1000</JText>
          </JView>

          <JView
            themed
            row
            height={30}
            paddingHorizontal={10}
            borderRadius={15}
            align="center"
          >
            <JText marginRight={2}>生活你好啊</JText>
            <IconSymbol name="scribble.variable" size={20} />
          </JView>
        </JView>

        <JView row style={styles.summary}>
          <JText>
            <JText color={color}>{t('ledger.monthlyIncome')}: </JText>
            <JText bold color={color}>12000</JText>
          </JText>
          <JText marginLeft={15}>
            <JText color={color}>{t('ledger.monthlyExpense')}: </JText>
            <JText bold color={color}>11000</JText>
          </JText>
        </JView>
      </ImageBackground>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    width: 370,
    height: 140,
    borderRadius: 16,
    overflow: 'hidden',
    boxShadow: '0 1px 2px rgba(128, 128, 128, 0.2)',
    backgroundColor: 'red'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20
  },
  balanceInfo: {
    paddingVertical: 15
  },
  summary: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.2)'
  }
})

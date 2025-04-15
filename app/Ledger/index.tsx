import React, { useState, useEffect } from 'react'
import { ImageBackground, Pressable, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import ParallaxScrollView from '@/components/ParallaxScrollView'
import { JSwipeableList } from '@/components/JSwipeableList'
import { JText } from '@/components/JText'
import { useColors } from '@/hooks/useColor'
import { JMessage } from '@/components/JMessage'
import { JView } from '@/components/JView'
import { LedgerStackParamList } from '@/router/Ledger'
import { LedgerTypes } from '@/constants/ledger'

export type LedgerNavigationProp = StackNavigationProp<LedgerStackParamList>;

export default function Ledger() {
  const [list, setList] = useState<any>([])
  const [curLedgerId, setCurLedgerId] = useState('')

  const navigation = useNavigation<LedgerNavigationProp>()
  const [
    primaryButtonBackground,
    primaryButtonText,
    income,
    expense,
    lightNormalColor
  ] = useColors([
    'primaryButtonBackground',
    'primaryButtonText',
    'income',
    'expense',
    'lightNormalColor'
  ], { mode: 'light' })

  const getActions = (itemId: string) => [
    {
      label: '编辑',
      icon: 'square.and.pencil',
      onPress: () => {
        navigation.navigate('LedgerEditor', { id: itemId })
      },
      style: { backgroundColor: income },
      textStyle: { color: lightNormalColor },
      iconProps: { color: lightNormalColor }
    },
    {
      label: '删除',
      icon: 'trash',
      onPress: () => console.log('删除'),
      style: { backgroundColor: expense },
      textStyle: { color: lightNormalColor },
      iconProps: { color: lightNormalColor }
    }
  ]

  useEffect(() => {
    const data = [
      {
        id: '1',
        title: '生活你好吗',
        cover: 'https://sns-webpic-qc.xhscdn.com/202504031742/36737006494973fdad530f2c08c0e851/1040g2sg31c3sd3l4gu705ofctal8c86lqcpcqto!nc_n_webp_mw_1',
        type: 'daily',
        actions: getActions('1')
      },
      {
        id: '2',
        title: '旅游你好吗',
        cover: 'https://sns-webpic-qc.xhscdn.com/202504031744/88e8e948d3eba67e9f38f64a00ba4bec/1040g00831130asqkma005ofctal8c86l17dbjkg!nc_n_webp_mw_1',
        type: 'travel',
        actions: getActions('2')
      },
      {
        id: '3',
        title: '投资你好吗',
        cover: 'https://sns-webpic-qc.xhscdn.com/202504031744/99b8b2ef4b27571b2ed8757f353d9b55/1040g2sg31f329gp76e705ofctal8c86lmjk5sc8!nc_n_webp_mw_1',
        type: 'investment',
        actions: getActions('3')
      }
    ]
    setList(data)
    setCurLedgerId(data[0].id)
  }, [])

  const changeLedger = (id: string) => {
    if (curLedgerId === id) return
    setCurLedgerId(id)
    JMessage.success('切换成功')
  }

  return (
    <ParallaxScrollView>
      <JSwipeableList
        list={list}
        accordion
        renderItem={(item) => {
          const isActive = curLedgerId === item.id
          return (
            <Pressable onPress={() => changeLedger(item.id)}>
              <ImageBackground
                source={{ uri: item.cover }}
                style={styles.container}
              >
                {!isActive && <JView style={styles.overlay} />}

                <JView
                  flex={1}
                  justify="flex-end"
                  align="flex-start"
                  paddingHorizontal={20}
                  paddingVertical={15}
                >
                  <JView
                    paddingHorizontal={10}
                    paddingVertical={5}
                    borderRadius={12}
                    marginBottom={4}
                    background={primaryButtonBackground}
                  >
                    <JText
                      size={12}
                      color={primaryButtonText}
                      style={{ letterSpacing: 1 }}
                    >
                      {LedgerTypes.find(i => i.key === item.type)?.label || '未知'}
                    </JText>
                  </JView>

                  <JText
                    bold
                    size={22}
                    color={primaryButtonText}
                    style={[
                      styles.ledgerName,
                      isActive && styles.activeLedgerName
                    ]}
                  >
                    {item.title}
                  </JText>
                </JView>
              </ImageBackground>
            </Pressable>
          )
        }}
      />
    </ParallaxScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 170,
    // borderRadius: 12,
    // overflow: 'hidden'
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    backdropFilter: 'blur(2px)'
  },
  ledgerName: {
    textShadowColor: 'rgba(0, 0, 0, 0.6)',
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 6,
    letterSpacing: 2,
    fontWeight: '800',
    lineHeight: 30,
    marginBottom: 10,
    opacity: 0.6
  },
  activeLedgerName: {
    fontSize: 24,
    fontWeight: '900',
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowRadius: 8,
    opacity: 1
  }
})

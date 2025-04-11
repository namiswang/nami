import { useEffect, useState } from 'react'
import { ImageBackground, Pressable, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import ParallaxScrollView from '@/components/ParallaxScrollView'
import { JSwipeableList } from '@/components/JSwipeableList'
import { JText } from '@/components/JText'
import { useColor } from '@/hooks/useColor'
import { JMessage } from '@/components/JMessage'
import { JView } from '@/components/JView'
import { LedgerStackParamList } from '@/router/Ledger'

export type LedgerNavigationProp = StackNavigationProp<LedgerStackParamList>

export default function Ledger() {
  const [list, setList] = useState<any>([])
  const [curLedger, setCurLedger] = useState('')

  const navigation = useNavigation<LedgerNavigationProp>()
  const textColor = useColor('secondaryText', { mode: 'dark' })
  const activeTextColor = useColor('income')

  const getActions = (itemId: string) => [
    {
      label: '编辑',
      icon: 'square.and.pencil',
      onPress: () => {
        navigation.navigate('LedgerEditor', { id: itemId })
      },
      style: { backgroundColor: '#4CAF50' }
    },
    {
      label: '删除',
      icon: 'trash',
      onPress: () => console.log('删除'),
      style: { backgroundColor: '#FF5252' }
    }
  ]

  useEffect(() => {
    const data = [
      {
        id: '1',
        title: '生活你好吗',
        cover: 'https://sns-webpic-qc.xhscdn.com/202504031742/36737006494973fdad530f2c08c0e851/1040g2sg31c3sd3l4gu705ofctal8c86lqcpcqto!nc_n_webp_mw_1',
        actions: getActions('1')
      },
      {
        id: '2',
        title: '旅游你好吗',
        cover: 'https://sns-webpic-qc.xhscdn.com/202504031744/88e8e948d3eba67e9f38f64a00ba4bec/1040g00831130asqkma005ofctal8c86l17dbjkg!nc_n_webp_mw_1',
        actions: getActions('2')
      },
      {
        id: '3',
        title: '投资你好吗',
        cover: 'https://sns-webpic-qc.xhscdn.com/202504031744/99b8b2ef4b27571b2ed8757f353d9b55/1040g2sg31f329gp76e705ofctal8c86lmjk5sc8!nc_n_webp_mw_1',
        actions: getActions('3')
      }
    ]
    setList(data)
    setCurLedger(data[0].id)
  }, [])

  const changeLedger = (id: string) => {
    if (curLedger === id) return
    setCurLedger(id)
    JMessage.success('切换成功')
  }

  return (
    <ParallaxScrollView>
      <JSwipeableList
        list={list}
        accordion
        renderItem={(item) => (
          <Pressable onPress={() => changeLedger(item.id)}>
            <ImageBackground
              source={{ uri: item.cover }}
              style={[styles.container]}
            >
              {curLedger !== item.id && <JView style={styles.overlay} />}
              <JText
                bold
                size={80}
                style={[
                  styles.ledgerName,
                  curLedger === item.id && styles.activeLedgerName
                ]}
                color={curLedger === item.id ? activeTextColor : textColor}
              >
                {item.title}
              </JText>
            </ImageBackground>
          </Pressable>
        )}
      />
    </ParallaxScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 370,
    height: 140,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.6)'
  },
  ledgerName: {
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
    letterSpacing: 4,
    fontWeight: '900'
  },
  activeLedgerName: {
    transform: [{ scale: 1.1 }],
    textShadowColor: 'rgba(0, 0, 0, 0.7)',
    textShadowRadius: 6
  }
})

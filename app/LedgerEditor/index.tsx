import React, { useEffect, useState } from 'react'
import { ViewStyle, StyleSheet, ImageBackground, Image, Animated } from 'react-native'
import { RouteProp, useRoute } from '@react-navigation/native'
import ParallaxScrollView from '@/components/ParallaxScrollView'
import { JView } from '@/components/JView'
import { JText } from '@/components/JText'
import { JInput } from '@/components/JInput'
import { useColor, useColors } from '@/hooks/useColor'
import { Pressable } from 'react-native'
import { JSheet } from '@/components/JSheet'
import { JButton } from '@/components/JButton'
import * as ImagePicker from 'expo-image-picker'
import { LedgerTypes } from '@/constants/ledger'
import { IconSymbol } from '@/components/IconSymbol'
import { JCopy } from '@/components/JCopy'

export type LedgerEditorRouteParams = {
  id?: string
}

interface ledgerInfo {
  title: string
  cover: string
  type: typeof LedgerTypes[number]['key']
  code: string
  members: {
    id: string
    name: string
    avatar: string
    role: 'owner' | 'member'
  }[]
}

// 在组件顶部添加状态
export default function LedgerEditor() {
  const [id, setId] = useState<string>()
  const [type, setType] = useState<'add' | 'edit'>('add')
  const [ledgerInfo, setLedgerInfo] = useState<ledgerInfo>({
    title: '',
    cover: '',
    type: 'daily',
    code: '邀请码',
    members: [
      {
        id: '1',
        name: '张三',
        role: 'owner',
        avatar: 'https://sns-webpic-qc.xhscdn.com/202504031742/36737006494973fdad530f2c08c0e851/1040g2sg31c3sd3l4gu705ofctal8c86lqcpcqto!nc_n_webp_mw_1'
      },
      {
        id: '2',
        name: '李四',
        role: 'member',
        avatar: 'https://sns-webpic-qc.xhscdn.com/202504031744/88e8e948d3eba67e9f38f64a00ba4bec/1040g00831130asqkma005ofctal8c86l17dbjkg!nc_n_webp_mw_1'
      },
      {
        id: '3',
        name: '王五',
        role: 'member',
        avatar: 'https://sns-webpic-qc.xhscdn.com/202504031744/99b8b2ef4b27571b2ed8757f353d9b55/1040g2sg31f329gp76e705ofctal8c86lmjk5sc8!nc_n_webp_mw_1'
      }
    ]
  })
  const [titleError, setTitleError] = useState<string>()
  const [typeSheetVisible, setTypeSheetVisible] = useState(false)
  const [memberSheetVisible, setMemberSheetVisible] = useState(false)
  const [deletingMember, setDeletingMember] = useState<string>()

  const route = useRoute<RouteProp<{ LedgerEditor: LedgerEditorRouteParams }, 'LedgerEditor'>>()
  const params = route.params

  const userId = '1'

  const [borderColor, secondaryText, backgroundColor] = useColors(['secondaryBorder', 'secondaryText', 'elevatedBackground'])

  useEffect(() => {
    if (params?.id) {
      setType('edit')
      setId(params.id)
    } else {
      setType('add')
    }
  }, [params])

  useEffect(() => {
    if (!id) return
    // TODO - get ledger data by id
  }, [id])

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
      if (status !== 'granted') {
        console.log('拒绝访问图片库权限！')
      }
    })()
  }, [])

  const changeCover = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [37, 14],
        quality: 0.8,
        selectionLimit: 1
      })
      if (result.canceled) return
      const selectedImage = result.assets[0]
      setLedgerInfo(prev => ({
        ...prev,
        cover: selectedImage.uri
      }))
    } catch (error) {
      console.error('选择图片失败:', error)
    }
  }

  const handleCreateLedger = () => {
    if (!ledgerInfo.title) {
      setTitleError('请输入账本名称')
      return
    }
    console.log(1111, 'ledgerInfo', ledgerInfo)
  }

  const handleDeleteMember = (memberId: string) => {
    setLedgerInfo(prev => ({
      ...prev,
      members: prev.members.filter((m) => m.id !== memberId)
    }))
    setDeletingMember(undefined)
  }

  return (
    <ParallaxScrollView>
      <Pressable onPress={changeCover}>
        <ImageBackground
          source={{ uri: ledgerInfo.cover }}
          style={[styles.container, { backgroundColor }]}
        >
          {!ledgerInfo.cover && <JText color={secondaryText}>点击选择封面</JText>}
        </ImageBackground>
      </Pressable>

      <JView borderRadius={8} style={{ overflow: 'hidden' }}>
        <EditorItem
          label="名称"
          style={{ borderBottomWidth: 0.5, borderBottomColor: borderColor }}
          right={(
            <JInput
              bordered={false}
              clearable={false}
              textAlign="right"
              placeholder="请输入账本名称"
              containerStyle={{
                width: '100%',
                borderWidth: 0,
                marginBottom: 0
              }}
              inputContainerStyle={{ paddingRight: 0 }}
              inputStyle={{ color: '#687076' }}
              onChange={(value) => setLedgerInfo(prev => ({ ...prev, title: value }))}
              error={titleError}
            />
          )}
        />

        <EditorItem
          label="类型"
          right={(
            <JSheet
              value={typeSheetVisible}
              onChange={setTypeSheetVisible}
              trigger={
                <JView
                  justify="center"
                  align="flex-end"
                  width="full"
                  height="full"
                >
                  <JText size={16} color="#687076">
                    {LedgerTypes.find(item => item.key === ledgerInfo.type)?.label || '请选择账本类型'}
                  </JText>
                </JView>
              }
              children={(
                <>
                  <JText size={16} bold style={{ marginBottom: 20 }}>
                    选择账本类型
                  </JText>

                  {LedgerTypes.map((item) => (
                    <JButton
                      type={item.key === ledgerInfo.type ? 'primary' : 'normal'}
                      height={60}
                      key={item.key}
                      text={item.label}
                      onPress={() => {
                        setLedgerInfo(prev => ({ ...prev, type: item.key }))
                        setTypeSheetVisible(false)
                      }}
                    />
                  ))}
                </>
              )}
            />
          )}
        />
      </JView>

      {type === 'edit' && <JView borderRadius={8} style={{ overflow: 'hidden' }}>
        <EditorItem
          label="成员管理"
          style={{ borderBottomWidth: 0.5, borderBottomColor: borderColor }}
          right={(
            <JSheet
              value={memberSheetVisible}
              onChange={setMemberSheetVisible}
              trigger={
                <JView justify="center" align="flex-end" width="full" height="full">
                  <JText size={16} color="#687076">查看成员</JText>
                </JView>
              }
              children={(
                <JView themed>
                  <JView row justify="space-between" align="center" marginBottom={10}>
                    <JText bold size={16}>成员管理</JText>
                    <JCopy
                      displayText="添加成员"
                      copyText={ledgerInfo.code}
                      copiedText="已复制邀请码，请分享给好友"
                    />
                  </JView>

                  <Animated.ScrollView
                    scrollEventThrottle={16}
                    style={{ maxHeight: 300 }}
                  >
                    {ledgerInfo.members?.map((item, _, arr) => (
                      <JView
                        key={item.id}
                        row
                        themed
                        justify="space-between"
                        align="center"
                        padding={16}
                        borderRadius={12}
                        marginBottom={12}
                        style={[styles.memberCard, { backgroundColor }]}
                      >
                        <JView row align="center" flex={1}>
                          <Image
                            source={{ uri: item.avatar }}
                            style={styles.avatar}
                          />
                          <JView>
                            <JText size={16} bold>{item.name}</JText>
                            <JText size={14} color={secondaryText} style={{ marginTop: 4 }}>
                              {item.role === 'owner' ? '创建者' : '成员'}
                            </JText>
                          </JView>
                        </JView>

                        {item.role !== 'owner' && arr.find(i => i.id === userId)?.role === 'owner' && (
                          <JSheet
                            value={deletingMember === item.id}
                            onChange={(v) => setDeletingMember(v ? item.id : undefined)}
                            trigger={
                              <IconSymbol
                                name="trash"
                                size={20}
                                color="#FF4D4F"
                              />
                            }
                            children={
                              <JView padding={16}>
                                <JText size={16} bold style={{ marginBottom: 20 }}>
                                  确认删除成员
                                </JText>

                                <JText style={{ marginBottom: 20 }}>
                                  确定要将 {item.name} 从账本中移除吗？
                                </JText>

                                <JButton
                                  type="danger"
                                  text="确认删除"
                                  onPress={() => handleDeleteMember(item.id)}
                                />
                              </JView>
                            }
                          />
                        )}
                      </JView>
                    ))}
                  </Animated.ScrollView>
                </JView>
              )}
            />
          )}
        />
      </JView>}

      <JView row justify="space-evenly" align="center">
        {type === 'edit' && (
          <>
            {ledgerInfo.members?.find(i => i.id === userId)?.role === 'member' && (
              <JButton
                type="danger"
                marginHorizontal={10}
                style={{ flex: 1 }}
                text="退出"
                // onPress={}
              />
            )}

            {ledgerInfo.members?.find(i => i.id === userId)?.role === 'owner' && (
              <JButton
                type="danger"
                marginHorizontal={10}
                style={{ flex: 1 }}
                text="删除"
                // onPress={}
              />
            )}
          </>
        )}

        <JButton
          type="primary"
          marginHorizontal={10}
          style={{ flex: 1 }}
          text="保存"
          onPress={handleCreateLedger}
        />
      </JView>
    </ParallaxScrollView>
  )
}

interface EditorItemProps {
  label: string
  right: React.ReactNode
  style?: ViewStyle
}

function EditorItem({
  label,
  right,
  style = {}
}: EditorItemProps) {
  const backgroundColor = useColor('elevatedBackground')

  return (
    <JView
      row
      justify="space-between"
      align="center"
      height={54}
      paddingHorizontal={16}
      style={[{ backgroundColor }, style]}
    >
      <JText size={16}>{label}</JText>
      <JView flex={1} align="flex-end">{right}</JView>
    </JView>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 370,
    height: 140,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#e0e0e0'
  },
  memberCard: {
    // backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16
  }
})

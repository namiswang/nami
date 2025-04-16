import { JView } from '@/components/JView'
import { JChart } from '@/components/JChart'
import dayjs from 'dayjs'
import { JText } from '@/components/JText'
import React, { useState } from 'react'
import { useColor } from '@/hooks/useColor'
import { IconSymbol } from '@/components/IconSymbol'
import { useTranslation } from 'react-i18next'

export default function TransactionChart() {
  const [viewWidth, setViewWidth] = useState(0)

  const { t } = useTranslation()
  const backgroundColor = useColor('elevatedBackground')

  const week = [
    t('week.monday'),
    t('week.tuesday'),
    t('week.wednesday'),
    t('week.thursday'),
    t('week.friday'),
    t('week.saturday'),
    t('week.sunday')
  ]
  const todayIndex = (dayjs().day() + 6) % 7
  const recentWeek = [...week.slice(todayIndex - 6), ...week.slice(0, todayIndex - 6)]

  const barData = {
    labels: recentWeek,
    datasets: [40, 80, 60, 90, 100, 30, 50]
  }

  return (
    <JView
      themed
      style={{
        backgroundColor,
        borderRadius: 8,
        paddingVertical: 8,
        overflow: 'hidden',
        boxShadow: '0 1px 2px rgba(128, 128, 128, 0.2)'
      }}
      onLayout={(event) => {
        const { width } = event.nativeEvent.layout
        setViewWidth(width)
      }}
    >
      <JView
        justify="space-between"
        paddingHorizontal={12}
      >
        <JView row justify="space-between" align="center">
          <JText size={16} bold>{t('ledger.recentExpense')}</JText>
          <IconSymbol name="ellipsis" size={20} />
        </JView>

        <JView row align="center" marginTop={2}>
          <JText size={12} color="#999">{t('ledger.total')}</JText>
          <JText size={12} color="#999" marginLeft={2}>0.00</JText>
        </JView>
      </JView>

      <JChart
        type="bar"
        width={viewWidth}
        style={{ paddingRight: 15 }}
        data={barData}
        height={160}
        config={{
          barPercentage: 0.7,
          barRadius: 4,
          propsForLabels: {
            dy: -4
          }
        }}
      />
    </JView>
  )
}
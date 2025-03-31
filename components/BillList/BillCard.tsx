import { ViewStyle } from 'react-native'
import { useTranslation } from 'react-i18next'
import dayjs from 'dayjs'
import { JView } from '@/components/ui/JView'
import { JText } from '@/components/ui/JText'
import { useColors } from '@/hooks/useColor'
import { useFormattedDate } from '@/hooks/useDateFormat'

interface Props {
  item: Record<string, any>
  style?: ViewStyle
}

export function BillCard({ item, style = {} }: Props) {
  const { t } = useTranslation()
  const { dateLabel, formattedDate } = useFormattedDate(item.date)
  const [
    secondaryText,
    backgroundColor,
    border,
    incomeColor,
    expenseColor
  ] = useColors([
    'secondaryText',
    'elevatedBackground',
    'secondaryBorder',
    'income',
    'expense'
  ])

  return (
    <JView style={{
      backgroundColor,
      borderRadius: 8,
      ...style
    }}>
      <JView
        row
        align="center"
        justify="space-between"
        paddingHorizontal={12}
        paddingVertical={10}
        style={{
          borderBottomWidth: 0.5,
          borderBottomColor: border
        }}
      >
        <JView row align="center">
          <JText bold>{formattedDate}</JText>
          {dateLabel && <JText marginLeft={5} bold>{dateLabel}</JText>}
        </JView>

        <JView row align="center">
          {item.totalIncome && <JText bold>{t('ledger.income')}:{item.totalIncome}</JText>}
          {item.totalExpense && <JText bold marginLeft={5}>{t('ledger.expense')}:{item.totalExpense}</JText>}
        </JView>
      </JView>

      {item.transactions.map((t: Record<string, any>, idx: number) => (
        <JView
          key={t.id}
          row
          justify="space-between"
          align="center"
          padding={12}
          style={{
            borderBottomWidth: idx !== item.transactions.length - 1 ? 0.5 : 0,
            borderBottomColor: border
          }}
        >
          <JView row align="center">
            <JView style={{
              width: 5,
              height: 5,
              marginRight: 15,
              borderRadius: '50%',
              backgroundColor: t.type === 'income' ? incomeColor : expenseColor
            }} />
            <JText size={15} color={secondaryText}>{t.category}</JText>
          </JView>
          <JText
            size={18}
            color={t.type === 'income' ? incomeColor : expenseColor}
          >
            {t.type === 'income' ? '+' : '-'}{t.money}
          </JText>
        </JView>
      ))}
    </JView>
  )
}
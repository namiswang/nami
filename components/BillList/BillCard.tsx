import { JView } from '@/components/ui/JView'
import { JText } from '@/components/ui/JText'
import { useColors } from '@/hooks/useColor'
import { ViewStyle } from 'react-native'

interface Props {
  item: Record<string, any>
  style?: ViewStyle
}

export function BillCard({ item, style = {} }: Props) {
  const [backgroundColor, buttonBorder] = useColors(['headerBackground', 'buttonBorder'])

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
          borderBottomColor: buttonBorder
        }}
      >
        <JView row align="center">
          <JText bold>03.27</JText>
          <JText marginLeft={5} bold>昨天</JText>
        </JView>

        <JView row align="center">
          {item.totalIncome && <JText bold>收:{item.totalIncome}</JText>}
          {item.totalExpense && <JText bold marginLeft={5}>支:{item.totalExpense}</JText>}
        </JView>
      </JView>

      {item.transactions.map((t: Record<string, any>, idx: number) => (
        <JView
          key={t.id}
          row
          justify="space-between"
          align="center"
          paddingHorizontal={12}
          paddingVertical={16}
          style={{
            borderBottomWidth: idx !== item.transactions.length - 1 ? 0.5 : 0,
            borderBottomColor: buttonBorder
          }}
        >
          <JView row align="center">
            <JText style={{
              width: 5,
              height: 5,
              marginRight: 15,
              borderRadius: '50%',
              backgroundColor: t.type === 'income' ? 'green' : 'red'
            }} />
            <JText size={15}>{t.category}</JText>
          </JView>
          <JText
            size={18}
            color={t.type === 'income' ? 'green' : 'red'}
          >
            {t.type === 'income' ? '+' : '-'}{t.money}
          </JText>
        </JView>
      ))}
    </JView>
  )
}
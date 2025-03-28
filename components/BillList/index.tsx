import { JView } from '@/components/ui/JView'
import { BillCard } from '@/components/BillList/BillCard'
import { useEffect, useState } from 'react'

export function BillList() {
  const [list, setList] = useState<Record<string, any>[]>([])

  useEffect(() => {
    const mockData = [
      {
        id: 'today',
        date: new Date(),
        totalIncome: 20,
        totalExpense: 4.5,
        transactions: [
          {
            id: '接单',
            type: 'income',
            money: 20,
            category: '接单'
          },
          {
            id: '三餐',
            type: 'expense',
            money: 4.5,
            category: '三餐'
          }
        ]
      },
      {
        id: 'yesterday',
        date: new Date(new Date().setDate(new Date().getDate() - 1)),
        totalIncome: 20,
        totalExpense: 4.5,
        transactions: [
          {
            id: '接单',
            type: 'income',
            money: 20,
            category: '接单'
          },
          {
            id: '三餐',
            type: 'expense',
            money: 4.5,
            category: '三餐'
          }
        ]
      },
      {
        id: 'beforeYesterday',
        date: new Date(new Date().setDate(new Date().getDate() - 2)),
        totalIncome: 20,
        totalExpense: 4.5,
        transactions: [
          {
            id: '接单',
            type: 'income',
            money: 20,
            category: '接单'
          },
          {
            id: '三餐',
            type: 'expense',
            money: 4.5,
            category: '三餐'
          }
        ]
      },
      {
        id: 'lastYear',
        date: new Date('2024-12-01'),
        totalIncome: 20,
        totalExpense: 4.5,
        transactions: [
          {
            id: '接单',
            type: 'income',
            money: 20,
            category: '接单'
          },
          {
            id: '三餐',
            type: 'expense',
            money: 4.5,
            category: '三餐'
          }
        ]
      }
    ]
    setList(mockData)
  }, [])

  return (
    <JView style={{ gap: 12 }}>
      {list.map((item, index) => (
        <BillCard
          key={item.id}
          item={item}
          style={{ marginBottom: index === list.length - 1 ? 100 : 0 }}
        />
      ))}
    </JView>
  )
}
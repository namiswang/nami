import React, { useState } from 'react'
import { JSwipeable } from '@/components/JSwipeable'
import { Grid } from '@/components/Grid'

interface Props {
  list: ({
    id: string
    actions: any
  } & Record<string, any>)[]
  renderItem: (item: Props['list'][number]) => React.ReactNode
  accordion?: boolean
}

export function JSwipeableList({ list, accordion = false, renderItem }: Props) {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set())

  const handleSwipeChange = (itemId: string, isOpen: boolean) => {
    setOpenItems(prev => {
      const newSet = new Set(prev)
      if (accordion && isOpen) {
        newSet.clear()
        newSet.add(itemId)
      } else if (isOpen) {
        newSet.add(itemId)
      } else {
        newSet.delete(itemId)
      }
      return newSet
    })
  }

  return (
    <Grid columns={1} spacing={16}>
      {list.map((item) => (
        <JSwipeable
          key={item.id}
          actions={item.actions}
          value={openItems.has(item.id)}
          onChange={(isOpen) => handleSwipeChange(item.id, isOpen)}
        >
          {renderItem(item)}
        </JSwipeable>
      ))}
    </Grid>
  )
}

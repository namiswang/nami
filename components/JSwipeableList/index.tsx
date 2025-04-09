import React from 'react'
import { JSwipeable } from '@/components/JSwipeable'
import { Grid } from '@/components/Grid'

interface Props {
  list: ({
    id: string
    actions: any
  } & Record<string, any>)[]
  renderItem: (item: Props['list'][0]) => React.ReactNode
  accordion?: boolean
}

export function JSwipeableList({ list, accordion = false, renderItem }: Props) {
  return (
    <Grid columns={1} spacing={16}>
      {list.map((item) => (
        <JSwipeable key={item.id} actions={item.actions}>
          {renderItem(item)}
        </JSwipeable>
      ))}
    </Grid>
  )
}

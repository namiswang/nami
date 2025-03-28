import { useTranslation } from 'react-i18next'
import dayjs from 'dayjs'

export function useFormattedDate(date: Date) {
  const { t } = useTranslation()
  const today = dayjs()
  const yesterday = today.subtract(1, 'day')

  // 判断是否为今天
  if (dayjs(date).isSame(today, 'day'))
    return { dateLabel: t('date.today'), formattedDate: today.format('MM-DD') }

  // 判断是否为昨天
  if (dayjs(date).isSame(yesterday, 'day'))
    return { dateLabel: t('date.yesterday'), formattedDate: yesterday.format('MM-DD') }

  // 如果是今年
  if (dayjs(date).isSame(today, 'year'))
    return { dateLabel: '', formattedDate: dayjs(date).format('MM-DD') }

  // 如果是其他年份
  return { dateLabel: '', formattedDate: dayjs(date).format('YYYY-MM-DD') }
}

import dayjs from 'dayjs'

/**
 * 格式化时间
 * @param date 日期
 * @param formatted 格式
 * @returns 
 */
export const formatTime = (date: dayjs.ConfigType, formatted = 'YYYY-MM-DD HH:mm:ss') => {
  return dayjs(date).format(formatted)
}

/**
 * 获取上午或者下午的小时时间
 * @param date 日期
 * @param Case 上午下午大小写
 * @returns 
 */
export const getHourAmPmTime = (date: dayjs.ConfigType, Case: 'a' | 'A') => {
  const time = dayjs(date);
  return time.format('HH') + time.format(Case)
}


enum WeekEnum {
  '周天',
  '周一',
  '周二',
  '周三',
  '周四',
  '周五',
  '周六'
}
/**
 * 获取周几
 * @param date 
 * @returns 
 */
export const getWeekNum = (date: dayjs.ConfigType) => {
  const num = dayjs(date).day()
  return WeekEnum[num]
}
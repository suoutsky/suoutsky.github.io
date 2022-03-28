import request from '../utils/network/request';

// 日期天气类型
export type dateWeather = {
  fxDate: string, // 日期
  tempMax: string, // 最高温度
  tempMin: string, // 最低温度
  iconDay: string // 图标
}
// 小时天气类型
export type hourWeather = {
  fxTime: string, // 时间
  temp: string // 温度
}
// 实时天气类型
export type todayWeather = {
    obsTime: string,
    temp: string, // 温度
    humidity: string, // 相对湿度，百分比数值
    windSpeed: string, // 风速度
    precip: string,  // 当前小时累计降水量，默认单位：毫米
    windDir: string, // 风描述
    text: string // 风强度
  }
  export const getWeatherNow = request.get('https://api.qweather.com/v7/weather/now?key=6a5403f3e17644f7a36c7f092ee9d30c&location=101210101', {});
  export const getWeather7d = request.get('https://api.qweather.com/v7/weather/7d?key=6a5403f3e17644f7a36c7f092ee9d30c&location=101210101', {});
  export const getWeather24h = request.get('https://api.qweather.com/v7/weather/24h?key=6a5403f3e17644f7a36c7f092ee9d30c&location=101210101', {});


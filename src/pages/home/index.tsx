import { useState, useEffect }from 'react'
import styles from './index.module.less';
import { Link } from 'react-router-dom';
import { getWeatherNow, todayWeather }  from '../../api';
import { getHourAmPmTime, getWeekNum } from '../../utils/date'
import Storage from '@/utils/storage'

const weatherDetail = [
    {name:'降雨量', unit:'%', key: 'precip'}, 
    {name:'湿度', unit:'%', key: 'humidity'}, 
    {name:'风度', unit:'km/h', key: 'windSpeed'}]
type weatherDetailKey =  'precip' | 'humidity' | 'windSpeed'
export default function Home () {
  const [weatherRes, setWeatherRes] = useState<todayWeather>({
    obsTime: '',
    temp: '', // 温度
    text: '', // 天气描述
    humidity: '', // 相对湿度，百分比数值
    windSpeed: '', // 风速度
    precip: '',  // 当前小时累计降水量，默认单位：毫米
    windDir: '', // 风描述
  })
  useEffect(() => {
    getWeatherNow().then((res) => {
      Storage.setItem('weatherRes', res.now)
      setWeatherRes(res.now);
    }).catch(async (err) => {
      const res = await Storage.getItem('weatherRes')
      if(res) {
        setWeatherRes(await Storage.getItem('weatherRes'))
      }
    });
    }, []);
  let weatherDetailcp = weatherDetail.map((item)=>{
    return (
      <div className={styles.weatherDetailItem}  key={item.key}>
        <div className={styles.weatherDetailItemLeft}>{item.name}</div>
        <div className={styles.weatherDetailItemRight}>
        <span className={styles.number}>{weatherRes[item.key as weatherDetailKey] }</span>
        <span className={styles.unit}>{item.unit}</span>
        </div>
      </div>
    )
  });
  return (
    <div className={styles.home}>
      <div className={styles.raindrop}></div>  
      <div className={styles.card}>
      <div className={styles.city}>杭州市, 浙江省</div>
        <div className={styles.list}>
          <div className={styles.listLeft}>
          <div className={styles.temperatureWarp}>
            <div className={styles.number}>{weatherRes.temp}</div>
            <div className={styles.util}>°C</div>
          </div>
          <div className={styles.tiemWarp}>
            <span className={styles.date}>{getWeekNum(weatherRes.obsTime)},</span>
            <span className={styles.time}>{getHourAmPmTime(weatherRes.obsTime, 'a')}</span>
          </div>
          </div>
          <div className={styles.listRight}>
            <div className={styles.wind}>{weatherRes.windDir}</div>
            <div className={styles.cloud}>{weatherRes.text}</div>
          </div>
        </div>
        <div className={styles.linkBtn}><Link to={{
          pathname: '/detail',
          state: weatherRes
        }}>详情</Link></div>
      </div>
      <div className={styles.weatherDetail}>
         {weatherDetailcp}
      </div>
      <footer className={styles.footer}><div className={styles.homeTap}>home</div></footer>
    </div>
  )
}
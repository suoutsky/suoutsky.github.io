import styles from './index.module.less';
import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect }from 'react'
import { getWeather24h, getWeather7d, todayWeather }  from '../../api';
import DatesWeather from './components/datesWeather';
import HoursWeather from './components/hoursWeather';
import ChartWeather from './components/chartWeather';

import Storage from '@/utils/storage'

const weatherDetail = [
    {name:'降雨量', unit:'%', key: 'precip'}, 
    {name:'湿度', unit:'%', key: 'humidity'}, 
    {name:'风度', unit:'km/h', key: 'windSpeed'}]
type weatherDetailKey =  'precip' | 'humidity' | 'windSpeed'
export default function Detail () {
  const { state } = useLocation<todayWeather>();
  const [weatherHoursRes, setWeatherHoursRes] = useState([])
  const [weatherDatesRes, setWeatherDatesRes] = useState([])
    useEffect(() => {
      // 获取7天
      getWeather7d().then((res) => {
        Storage.setItem('weatherDatesRes', {value: res.daily})
        setWeatherDatesRes(res.daily);
      }).catch(async (err) => {
        const res = await Storage.getItem('weatherDatesRes')
        if(res) {
          setWeatherDatesRes(res.value)
        }
      });
      // 获取24小时
      getWeather24h().then((res) => {
        Storage.setItem('weatherHoursRes', {value:res.hourly})
        setWeatherHoursRes(res.hourly);
      }).catch(async (err) => {
        const res = await Storage.getItem('weatherHoursRes')
        if (res) {
          setWeatherHoursRes(res.value)
        }
      });
    }, []);
    let weatherDetailcp = weatherDetail.map((item)=>{
      return (
        <div className={styles.weatherDetailItem}  key={item.key}>
          <div className={styles.weatherDetailItemLeft}>{item.name}</div>
          <div className={styles.weatherDetailItemRight}>
          <div className={styles.number}>{state[item.key as weatherDetailKey]}</div>
          <div className={styles.unit}>{item.unit}</div>
          </div>
        </div>
      )
    });
  return (
    <div className={styles.detail}>
      <div className={styles.back}><Link to="/home">←</Link></div>
      <div className={styles.raindrop}></div>  
      <div className={styles.city}>杭州市, 浙江省</div>
      <div className={styles.temperatureWarp}>
        <div className={styles.number}>{state.temp}</div>
        <div className={styles.util}>°C</div>
      </div>
      <div className={styles.weatherDetail}>
        {weatherDetailcp}
      </div>
      <ChartWeather weatherList={weatherHoursRes}/>
      <HoursWeather weatherList={weatherHoursRes}/>
      <DatesWeather weatherList={weatherDatesRes}/>
    </div>
   )
}
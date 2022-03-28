import styles from './index.module.less';
import { hourWeather } from '../../../../api';
import { getHourAmPmTime } from '../../../../utils/date'

interface IProps {
    weatherList: hourWeather[]
 }
const HoursWeather: React.FC<IProps> = (props) => {
    const { weatherList } = props;
    return (
        <div className={styles.hoursWeatherWarp}>
          <div className={styles.box}>
            { weatherList.map((item,index) => (
                  <div className={styles.hoursWeatherItem} key={index}>
                    <div className={styles.tmp}><span className={styles.number}>{item.temp}</span> <span className={styles.unit}>°C</span></div>
                    <div className={styles.fxTime}>{getHourAmPmTime(item.fxTime, 'a')}</div>
                  </div>
            ))}
            </div>
        </div>
    )
}
export default HoursWeather;
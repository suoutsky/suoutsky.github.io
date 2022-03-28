import styles from './index.module.less';
import { dateWeather } from '../../../../api';
import { getWeekNum } from '../../../../utils/date'

interface IProps {
    weatherList: dateWeather[]
 }
const DatesWeather: React.FC<IProps> = (props) => {
    const { weatherList } = props;
    return (
        <div className={styles.datesWeatherWarp}>
            { weatherList.map((item, index) => (
                  <div className={styles.datesWeatherItem} key={index}>
                    <div className={styles.date}>{getWeekNum(item.fxDate)}</div>
                    <div className={styles.icon}><i className={'qi-'+ item.iconDay}></i></div>
                    <div className={styles.tmp}><span className={styles.tempMax}>{item.tempMax}°C</span> <span className={styles.tempMin}>{item.tempMin}°C</span></div>
                  </div>
            ))}
        </div>
    )
}
export default DatesWeather;
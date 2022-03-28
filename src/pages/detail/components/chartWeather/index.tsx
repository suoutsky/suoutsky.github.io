import styles from './index.module.less';
import { hourWeather } from '../../../../api';
import { getHourAmPmTime } from '../../../../utils/date'
import ReactEcharts from "echarts-for-react";
interface IProps {
  weatherList: hourWeather[]
}
const chartWeather: React.FC<IProps> = (props) => {
  const { weatherList } = props;
  const getOption = () => {
    const xData = weatherList.map((item) => {
      return getHourAmPmTime(item.fxTime, 'a')
    })
    const yData = weatherList.map((item) => {
      return item.temp
    })
    return {
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: xData
      },
      lineStyle: { color: '#E9C939' },
      yAxis: {
        show: false
      },
      grid:{
        height: 120,
        top: 0,
        left: 20,
        right: 20,
        bottom: 0
      },
      series: [
        {
          data: yData,
          type: 'line',
          showSymbol: false,
          areaStyle: {
            color: 'rgba(233, 201, 57, 0.25)'
          }
        }
      ]
    };
  }
  return (
    <div className={styles.chartWeatherWarp}>
      <ReactEcharts
        option={getOption()}
        style={{height: '140px', width: '100%'}}
        notMerge={true}
        lazyUpdate={true}
          />
    </div>
  )
}
export default chartWeather;
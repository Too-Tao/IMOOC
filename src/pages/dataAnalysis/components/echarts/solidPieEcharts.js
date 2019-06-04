import React, { PureComponent } from 'react'
import ReactEchartsCore from 'echarts-for-react/lib/core'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/pie';
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import { ECHARTS_COLOR } from 'utils/constants'

class SolidPieEcharts extends PureComponent {
  render () {
    const { title, chartData } = this.props
    const options = {
      color: ECHARTS_COLOR,
      title: {
        text: title,
        textStyle: {
          fontSize: 15
        },
        top: 15,
        left: 5
      },
      tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    series : [
        {
          name: title,
          type: 'pie',
          radius : '70%',
          center: ['50%', '50%'],
          data: chartData,
          itemStyle: {
              emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
          }
        }
      ]
    }
    return (
      <ReactEchartsCore echarts={echarts} option={options} style={{ height: 250 }} />
    )
  }
}

export default SolidPieEcharts
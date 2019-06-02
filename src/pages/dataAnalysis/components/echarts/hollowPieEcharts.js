import React, { PureComponent } from 'react'
import ReactEchartsCore from 'echarts-for-react/lib/core'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/pie';
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import { ECHARTS_COLOR } from 'utils/constants'

class HollowPieEcharts extends PureComponent {
  render () {
    const { title, chartData }  = this.props

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
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
      },
      series: [
        {
          name:'课程难度',
          type:'pie',
          radius: ['50%', '70%'],
          avoidLabelOverlap: false,
          label: {
            normal: {
                show: false,
                position: 'center'
            },
            emphasis: {
                show: true,
                textStyle: {
                    fontSize: '30',
                    fontWeight: 'bold'
                }
            }
          },
          labelLine: {
            normal: {
                show: false
            }
          },
          data: chartData
        }
      ]
    }

    return (
      <ReactEchartsCore echarts={echarts} option={options} style={{ height: 250 }} />
    )
  }
}

export default HollowPieEcharts
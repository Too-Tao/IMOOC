import React, { PureComponent } from 'react'
import ReactEchartsCore from 'echarts-for-react/lib/core'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import { ECHARTS_COLOR } from 'utils/constants'

class BarEcharts extends PureComponent {
  render () {
    const { title } = this.props
    const option = {
      title: {
        text: title,
        textStyle: {
          fontSize: 15
        },
        top: 15,
        left: 5
      },
      color: ECHARTS_COLOR,
      tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
          type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      xAxis: {
        type: 'category',
        data: ['<7.5', '7.5-7.9', '8.0-8.4', '8.5-8.9', '9.0-9.4', '9.5-9.9', '10']
      },
      yAxis: {
          type: 'value'
      },
      series: [{
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'bar'
      }]
    }
    return (
      <ReactEchartsCore option={option} echarts={echarts} />
    )
  }
}

export default BarEcharts
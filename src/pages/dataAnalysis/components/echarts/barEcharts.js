import React, { PureComponent } from 'react'
import ReactEchartsCore from 'echarts-for-react/lib/core'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import { ECHARTS_COLOR } from 'utils/constants'

class BarEcharts extends PureComponent {

  getData = (chartData) => {
    let data = {}
    let xAxisData = []
    let seriesData = []
    for (let i = 0; i < chartData.length; i++) {
      xAxisData.unshift(chartData[i].name)
      seriesData.unshift(chartData[i].value)
    }
    data = {xAxisData,seriesData}
    return data
  }

  render () {
    const { title, chartData } = this.props
    const data = this.getData(chartData)
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
        axisPointer: {
          type: 'shadow'
        }
      },
      xAxis: {
        type: 'category',
        data: data.xAxisData
      },
      yAxis: {
          type: 'value'
      },
      series: [{
          data: data.seriesData,
          type: 'bar'
      }]
    }
    return (
      <ReactEchartsCore option={option} echarts={echarts} />
    )
  }
}

export default BarEcharts
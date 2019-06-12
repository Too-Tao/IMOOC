import React, { PureComponent } from 'react'
import ReactEchartsCore from 'echarts-for-react/lib/core'
import echarts from 'echarts/lib/echarts'
import  'echarts/lib/chart/line'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import { ECHARTS_COLOR } from 'utils/constants'

class LineEcharts extends PureComponent {

  getData = (list) => {
    let legendData = []
    let seriesData = []
    for (let i = 0; i < list.length; i ++) {
        legendData.unshift(list[i].name)
        seriesData.unshift({
            name: list[i].name,
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: list[i].data
        })
    }
    const data = {
        legendData,
        seriesData
    }
    return data
  }

  render () {
    const { title, chartData } = this.props
    const { data, list } = chartData
    const xAxisData = data
    const lineData = this.getData(list)
    const option = {
      color: ECHARTS_COLOR,
      title: {
        text: title
    },
    tooltip : {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            label: {
                backgroundColor: '#6a7985'
            }
        }
    },
    legend: {
        data: lineData.legendData
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis : [
        {
            type : 'category',
            boundaryGap : false,
            data : xAxisData
        }
    ],
    yAxis : [
        {
            type : 'value'
        }
    ],
    series : lineData.seriesData
    }
    return (
      <ReactEchartsCore option={option} echarts={echarts} />
    )
  }
}

export default LineEcharts
import React from 'react'
import { View, Dimensions, ViewStyle } from 'react-native'
import { LineChart, BarChart, PieChart } from 'react-native-chart-kit'
import { AbstractChartConfig } from 'react-native-chart-kit/dist/AbstractChart'
import { useColors } from '@/hooks/useColor'

const screenWidth = Dimensions.get('window').width

interface ChartProps {
  type: 'line' | 'bar' | 'pie';
  data: any;
  style?: ViewStyle
  width?: number;
  height?: number;
  config?: AbstractChartConfig
}

export function JChart({
  type,
  data,
  style = {},
  width = screenWidth - 30,
  height = 200,
  config = {}
}: ChartProps) {
  const [chartBackground, labelColor, barColor] = useColors(['elevatedBackground', 'text', 'secondaryText'])

  switch (type) {
    case 'line':
      return (
        <LineChart
          data={data}
          width={width}
          height={height}
          chartConfig={{
            backgroundColor: chartBackground,
            backgroundGradientFrom: chartBackground,
            backgroundGradientTo: chartBackground,
            decimalPlaces: 2,
            color: (opacity = 1) => `${labelColor}${Math.floor(opacity * 255).toString(16).padStart(2, '0')}`,
            labelColor: (opacity = 1) => `${labelColor}${Math.floor(opacity * 255).toString(16).padStart(2, '0')}`,
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#ffa726'
            },
            ...config
          }}
        />
      )

    case 'bar':
      return (
        <BarChart
          width={width}
          height={height}
          data={{
            labels: data.labels,
            datasets: [{ data: data.datasets }]
          }}
          style={{
            alignSelf: 'center',
            ...style
          }}
          yAxisLabel=""
          yAxisSuffix=""
          withInnerLines={false}
          withHorizontalLabels={false}
          showBarTops={true}
          showValuesOnTopOfBars={true}
          fromZero={true}
          withCustomBarColorFromData={false}
          chartConfig={{
            backgroundColor: chartBackground,
            backgroundGradientFrom: chartBackground,
            backgroundGradientTo: chartBackground,
            decimalPlaces: 2, // 小数点
            color: (opacity = 1) => `${barColor}${Math.floor(opacity * 255).toString(16).padStart(2, '0')}`,
            labelColor: (opacity = 1) => `${labelColor}${Math.floor(opacity * 255).toString(16).padStart(2, '0')}`,
            ...config
          }}
        />
      )

    case 'pie':
      return (
        <PieChart
          data={data}
          width={width}
          height={height}
          backgroundColor={''}
          paddingLeft={''}
          chartConfig={{
            backgroundColor: chartBackground,
            color: (opacity = 1) => `rgba(255, 99, 132, ${opacity})`,
            style: {
              borderRadius: 16
            },
            ...config
          }}
          accessor="population"
        />
      )

    default:
      return <View />
  }
}

const LineChartDemo = () => {
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [{ data: [20, 45, 28, 80, 99, 43] }]
  }

  return <JChart type="line" data={data} />
}

const BarChartDemo = () => {
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [40, 80, 60, 90, 100]
  }

  return <JChart type="bar" data={data} />
}

const PieChartDemo = () => {
  const data = [
    {
      name: 'Food',
      population: 35,
      color: '#FF6384',
      legendFontSize: 15,
      legendFontColor: '#fff'
    },
    {
      name: 'Rent',
      population: 40,
      color: '#36A2EB',
      legendFontSize: 15,
      legendFontColor: '#fff'
    },
    {
      name: 'Entertainment',
      population: 25,
      color: '#FFCE56',
      legendFontSize: 15,
      legendFontColor: '#fff'
    }
  ]

  return <JChart type="pie" data={data} />
}
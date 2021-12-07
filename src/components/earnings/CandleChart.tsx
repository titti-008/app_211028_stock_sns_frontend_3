/* eslint-disable */

import { FC, useRef, useEffect } from 'react';
import { useTheme } from '@mui/material';
import * as echarts from 'echarts';
import { useColors } from '../../hooks/util';
import { StockPrice } from '../Types';

type PropsType = {
  historical: StockPrice[];
  symbol: string;
};

const CandleChart: FC<PropsType> = ({ historical, symbol }) => {
  const theme = useTheme();
  const colors = useColors();

  // const { currentUser } = state;
  console.log('historical', historical);

  const divRef = useRef<HTMLDivElement>(null!);

  useEffect(() => {
    const { upColor, upBorderColor, downColor, downBorderColor, borderColor } =
      colors.chart;

    // データの整形
    const splitData = (jsonData: StockPrice[]) => {
      const categoryData: string[] = [];
      const values: number[][] = [];
      const volumes: number[] = [];

      jsonData.forEach((stockPrice) => {
        categoryData.unshift(String(stockPrice.date));
        values.unshift([
          stockPrice.open,
          stockPrice.close,
          stockPrice.low,
          stockPrice.high,
        ]);
        volumes.unshift(stockPrice.volume);
      });

      return {
        categoryData,
        values,
        volumes,
      };
    };

    const data0 = splitData(historical);

    // 移動平均線関数
    const calculateMA = (dayCount: number) => {
      const result: Array<number | '-'> = [];

      data0.values.reduce(
        (sum, value, index: number) => {
          const deleteValue =
            index >= dayCount ? data0.values[index - dayCount][1] : 0;

          const MA = sum[0] + value[1] - deleteValue;

          if (index < dayCount) {
            result.push('-');
          } else {
            result.push(Math.round((MA / dayCount) * 100) / 100);
          }

          return [MA];
        },
        [0],
      );

      return result;
    };

    const myChart = echarts.init(divRef.current);

    myChart.setOption(
      {
        legend: {
          top: 35,
          left: 'center',
          data: ['日足', 'MA50', 'MA200', '出来高'],
          textStyle: {
            color: colors.text,
          },
        },
        title: {
          text: symbol,
          left: 0,
          textStyle: {
            color: colors.text,
          },
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
          },
          backgroundColor: colors.header,
          borderWidth: 1,
          borderColor: '#ccc',
          padding: 10,
          textStyle: {
            color: colors.text,
          },
          // position: (
          //   pos: [number, number],
          //   size: {
          //     contentSize: [number, number];
          //     viewSize: [number, number];
          //   },
          // ) => {
          //   const obj: Record<string, number> = {
          //     top: 10,
          //   };
          //   obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 30;

          //   return obj;
          // },
        },
        axisPointer: {
          link: [
            {
              xAxisIndex: 'all',
            },
          ],
          label: {
            backgroundColor: '#777',
          },
        },
        toolbox: {
          iconStyle: {
            borderColor: colors.chart.borderColor,
          },
          right: 30,
          feature: {
            show: true,
            showTitle: false,
            dataZoom: {
              yAxisIndex: 'none',
              title: 'ズーム',
            },
            dataView: { readOnly: false, title: 'データを参照' },
            magicType: { type: ['line', 'bar'], title: 'magicType!!' },
            brush: {
              type: ['lineX', 'clear'],
              title: 'brush!!',
            },
            restore: { title: '元に戻す' },
            saveAsImage: {
              title: '画像で保存',
            },
          },
          tooltip: {
            show: true,
            formatter: (param: { title: string }) =>
              `<div>${param.title}</div>`,
          },
        },
        brush: {
          xAxisIndex: 'all',
          brushLink: 'all',
          outOfBrush: {
            colorAlpha: 0.1,
          },
        },
        visualMap: [
          {
            type: 'piecewise',
            show: false,
            seriesIndex: 2,
            dimension: 2,
            borderColor: 'blue',
            pieces: [
              {
                value: 1,
                color: downColor,
              },
              {
                value: -1,
                color: upColor,
              },
            ],
          },
        ],
        // visualMap: {
        //   show: false,
        //   seriesIndex: 5,
        //   dimension: 2,
        //   pieces: [
        //     {
        //       value: 1,
        //       color: downColor,
        //     },
        //     {
        //       value: -1,
        //       color: upColor,
        //     },
        //   ],
        // },
        grid: [
          {
            left: '10%',
            right: '3%',
            height: '50%',
          },
          {
            left: '10%',
            right: '3%',
            top: '63%',
            height: '20%',
          },
        ],
        xAxis: [
          {
            type: 'category',
            data: data0.categoryData,
            scale: true,
            boundaryGap: false,
            axisLine: {
              onZero: false,
              lineStyle: { color: borderColor },
            },
            splitLine: {
              show: true,
              lineStyle: { color: borderColor },
            },
            min: 'dataMin',
            max: 'dataMax',
            axisPointer: {
              z: 100,
            },
          },
          {
            type: 'category',
            gridIndex: 1,
            data: data0.categoryData,
            scale: true,
            boundaryGap: false,
            axisLine: { onZero: false },
            axisTick: { show: false },
            splitLine: { show: false },
            axisLabel: { show: false },
            min: 'dataMin',
            max: 'dataMax',
          },
        ],
        yAxis: [
          {
            scale: true,
            axisLine: {
              show: true,
              lineStyle: { color: borderColor },
            },
            splitLine: {
              show: true,
              lineStyle: { color: borderColor },
            },
            splitArea: {
              show: true,
              areaStyle: {
                color: ['none', 'none'],
              },
            },
          },
          {
            scale: true,
            gridIndex: 1,
            splitNumber: 2,
            axisLabel: { show: false },
            axisLine: { show: false },
            axisTick: { show: false },
            splitLine: { show: false },
          },
        ],
        dataZoom: [
          {
            type: 'inside',
            xAxisIndex: [0, 1],
            rangeMode: ['value', 'value'],
            startValue: data0.categoryData.length - 99,
            endValue: data0.categoryData.length + 1,
          },
          {
            // 横軸のズームスライダー
            show: true,
            xAxisIndex: [0, 1],
            type: 'slider',
            top: '85%',
            rangeMode: ['value', 'value'],
            startValue: 40,
            endValue: 80,
            textStyle: {
              color: colors.text,
            },
          },
        ],
        series: [
          {
            name: '日足',
            type: 'candlestick',
            data: data0.values,
            itemStyle: {
              color: upColor,
              color0: downColor,
              borderColor: upBorderColor,
              borderColor0: downBorderColor,
            },

            // tooltip: {
            //   formatter(param:echarts.EChartOption.Tooltip.Format | echarts.EChartOption.Tooltip.Format[]) {
            //     param = param[0];

            //     return [
            //       `Date: ${param.name}<hr size=1 style="margin: 3px 0">`,
            //       `Open: ${param.data[0]}<br/>`,
            //       `Close: ${param.data[1]}<br/>`,
            //       `Lowest: ${param.data[2]}<br/>`,
            //       `Highest: ${param.data[3]}<br/>`,
            //     ].join('');
            //   },
            // },
          },
          {
            name: 'MA50',
            type: 'line',
            data: calculateMA(50),
            smooth: true,
            lineStyle: {
              opacity: 0.7,
              color: colors.chart.borderColor,
            },
          },
          {
            name: 'MA200',
            type: 'line',
            data: calculateMA(200),
            smooth: true,
            lineStyle: {
              opacity: 0.7,

              color: colors.chart.downBorderColor,
            },
          },
          {
            name: '出来高',
            type: 'bar',
            xAxisIndex: 1,
            yAxisIndex: 1,
            data: data0.volumes,
            itemStyle: {
              color: colors.chart.borderColor,
            },
          },
        ],
      },
      true,
    );

    // myChart.dispatchAction({
    //   type: 'brush',
    //   areas: [
    //     {
    //       brushType: 'lineX',
    //       coordRange: ['2021-10-10', '2021-12-02'],
    //       xAxisIndex: 0,
    //     },
    //   ],
    // });
    // return () => {};
  }, [historical, symbol, colors, theme.palette.mode]);

  return (
    <>
      <div ref={divRef} style={{ width: '100%', height: '400px' }} />
    </>
  );
};

export default CandleChart;

/* eslint-disable */

/* eslint-disable */

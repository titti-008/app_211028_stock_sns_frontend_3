import { FC, useRef, useEffect } from 'react';
import { addYears } from 'date-fns';
import { useTheme } from '@mui/material';
import * as echarts from 'echarts';
import { useColors } from '../../hooks/useColors';
import { StockPrice } from '../Types';

type PropsType = {
  historical: StockPrice[];
  symbol: string;
  period: number[];
};

const CandleChart: FC<PropsType> = ({ historical, symbol, period }) => {
  const theme = useTheme();
  const colors = useColors();

  const divRef = useRef<HTMLDivElement>(null!);

  useEffect(() => {
    const { upColor, upBorderColor, downColor, downBorderColor, borderColor } =
      colors.chart;

    // データの整形
    const splitData = (jsonData: StockPrice[]) => {
      const categoryData: Date[] = [];
      const values: number[][] = [];
      const volumes: number[] = [];

      jsonData.forEach((stockPrice) => {
        categoryData.unshift(stockPrice.date);
        values.unshift([
          stockPrice.open,
          stockPrice.close,
          stockPrice.low,
          stockPrice.high,
        ]);
        volumes.unshift(stockPrice.volume);
      });

      const span = categoryData.filter(
        (date) =>
          new Date(date) >= addYears(new Date(), period[0]) &&
          new Date(date) <= addYears(new Date(), period[1]),
      );

      const start = span[0];
      const end = span[span.length - 1];

      return {
        categoryData,
        values,
        volumes,
        start,
        end,
        span,
      };
    };

    const data0 = splitData(historical);

    type Param = {
      close: number;
    };

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
          data: ['日足', '50日移動平均', '200日移動平均', '出来高'],
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
            left: '6%',
            right: '4%',
            height: '50%',
          },
          {
            left: '10%',
            right: '4%',
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
            axisLabel: {
              inside: true,
              padding: [2, 0, 0, 0],
              verticalAlign: 'top',
            },
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
            startValue: data0.start,
            endValue: data0.end,
          },
          {
            // 横軸のズームスライダー
            show: true,
            xAxisIndex: [0, 1],
            type: 'slider',
            top: '85%',
            rangeMode: ['value', 'value'],
            startValue: data0.start,
            endValue: data0.end,
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
              markPoint: {
                label: {
                  formatter(param: Param) {
                    return param != null ? `${Math.round(param.close)}` : '';
                  },
                },
                data: [
                  // {
                  //   name: 'Mark',
                  //   coord: ['2013/5/31', 2300],
                  //   value: 2300,
                  //   itemStyle: {
                  //     color: 'rgb(41,60,85)',
                  //   },
                  // },
                  {
                    name: 'highest value',
                    type: 'max',
                    valueDim: 'highest',
                  },
                  {
                    name: 'lowest value',
                    type: 'min',
                    valueDim: 'lowest',
                  },
                  {
                    name: 'average value on close',
                    type: 'average',
                    valueDim: 'close',
                  },
                ],
                /* eslint-disable */
                tooltip: {
                  formatter(param: any) {
                    return `${param.name}<br>${param.data.coord || ''}`;
                  },
                },
              },
              markLine: {
                symbol: ['pin', 'pin'],
                data: [
                  [
                    {
                      name: 'from lowest to highest',
                      type: 'min',
                      valueDim: 'lowest',
                      symbol: 'circle',
                      symbolSize: 10,
                      label: {
                        show: false,
                      },
                      emphasis: {
                        label: {
                          show: false,
                        },
                      },
                    },
                    {
                      type: 'max',
                      valueDim: 'highest',
                      symbol: 'circle',
                      symbolSize: 10,
                      label: {
                        show: false,
                      },
                      emphasis: {
                        label: {
                          show: false,
                        },
                      },
                    },
                  ],
                  {
                    name: 'min line on close',
                    type: 'min',
                    valueDim: 'close',
                  },
                  {
                    name: 'max line on close',
                    type: 'max',
                    valueDim: 'close',
                  },
                ],
              },
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
            name: '50日移動平均',
            type: 'line',
            data: calculateMA(50),
            smooth: true,
            lineStyle: {
              opacity: 0.7,
              color: colors.chart.borderColor,
            },
          },
          {
            name: '200日移動平均',
            type: 'line',
            data: calculateMA(200),
            smooth: true,
            lineStyle: {
              opacity: 0.7,

              color: colors.chart.upBorderColor,
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
  }, [historical, symbol, colors, theme.palette.mode, period]);

  return (
    <>
      <div ref={divRef} style={{ width: '100%', height: '400px' }} />
    </>
  );
};

export default CandleChart;

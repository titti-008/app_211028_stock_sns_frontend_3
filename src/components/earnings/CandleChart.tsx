import { FC, useRef, useEffect } from 'react';

import * as echarts from 'echarts';
import { useColors } from '../../hooks/util';
import { StockPrice } from '../Types';

type PropsType = {
  historical: StockPrice[];
  symbol: string;
};

/* eslint-disable */

const CandleChart: FC<PropsType> = ({ historical, symbol }) => {
  const colors = useColors();
  // const { state } = useAppContext();
  // const { currentUser } = state;
  console.log('historical', historical);

  const divRef = useRef<HTMLDivElement>(null!);

  // type EChartsOption = echarts.EChartOption<Series>;
  type EChartsOption = echarts.EChartsOption;

  // if (divRef.current === null) return <div>divRefがnull</div>;

  useEffect(() => {
    const { upColor, upBorderColor, downColor, downBorderColor } = colors.chart;

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

    const option: EChartsOption = {
      // animation: false,
      legend: {
        top: 5,
        left: 'center',
        data: ['日足', 'MA50', 'MA200'],
        textStyle: {
          color: colors.text,
        },
      },
      // title: {
      //   text: symbol,
      //   left: 0,
      //   textStyle: {
      //     color: colors.text,
      //   },
      // },
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
        position(pos, params, el, elRect, size) {
          const obj: Record<string, number> = {
            top: 10,
          };
          obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 30;

          return obj;
        },
      },
      // extraCssText: 'width: 170px'

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
        feature: {
          dataZoom: {
            yAxisIndex: false,
          },
          brush: {
            type: ['lineX', 'clear'],
          },
        },
      },
      brush: {
        xAxisIndex: 'all',
        brushLink: 'all',
        outOfBrush: {
          colorAlpha: 0.1,
        },
      },
      visualMap: {
        show: false,
        seriesIndex: 5,
        dimension: 2,
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
          axisLine: { onZero: false },
          splitLine: { show: false },
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
          splitArea: {
            show: true,
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
          //   formatter (param: any) {
          //     param = param[0];

          //     return [
          //       `Date: ${  param.name  }<hr size=1 style="margin: 3px 0">`,
          //       `Open: ${  param.data[0]  }<br/>`,
          //       `Close: ${  param.data[1]  }<br/>`,
          //       `Lowest: ${  param.data[2]  }<br/>`,
          //       `Highest: ${  param.data[3]  }<br/>`,
          //     ].join('');
          //   },
          // },

          markPoint: {
            label: {
              formatter(param: any) {
                return param != null ? `${Math.round(param.value)}` : '';
              },
              color: colors.text,
            },
            data: [
              {
                name: 'Mark',
                coord: ['2013/5/31', 2300],
                value: 2300,
                itemStyle: {
                  color: 'red',
                },
              },
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
            tooltip: {
              formatter(param: any) {
                return `${param.name}<br>${param.data.coord || ''}`;
              },
            },
          },
          markLine: {
            symbol: ['none', 'none'],
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
                itemStyle: {
                  color: 'red',
                },
              },
              {
                name: 'max line on close',
                type: 'max',
                valueDim: 'close',
                itemStyle: {
                  color: 'red',
                },
              },
            ],
          },
        },
        {
          name: 'MA50',
          type: 'line',
          data: calculateMA(50),
          smooth: true,
          lineStyle: {
            opacity: 0.4,
          },
        },
        {
          name: 'MA200',
          type: 'line',
          data: calculateMA(200),
          smooth: true,
          lineStyle: {
            opacity: 0.4,
          },
        },
        {
          name: '出来高',
          type: 'bar',
          xAxisIndex: 1,
          yAxisIndex: 1,
          data: data0.volumes,
        },
      ],
    };

    const myChart = echarts.init(divRef.current);

    option && myChart.setOption(option);

    myChart.dispatchAction({
      type: 'brush',
      areas: [
        {
          brushType: 'lineX',
          coordRange: ['2021-10-10', '2021-12-02'],
          xAxisIndex: 0,
        },
      ],
    });
    // return () => {
    // };
  }, [historical, symbol, colors]);

  return (
    <>
      <div ref={divRef} style={{ width: '100%', height: '400px' }} />
    </>
  );
};

export default CandleChart;

/* eslint-disable */

/* eslint-disable */

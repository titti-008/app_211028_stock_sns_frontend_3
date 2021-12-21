import { FC, useRef, useEffect } from 'react';
import { addYears } from 'date-fns';
import * as echarts from 'echarts';
import { useColors } from '../../hooks/useColors';
import { EarningType } from '../Types';

type PropsType = {
  earnings: EarningType[];
  period: number[];
};
const GrowthCharts: FC<PropsType> = ({ earnings, period }) => {
  const colors = useColors();
  const divRef = useRef<HTMLDivElement>(null!);

  useEffect(() => {
    // データの整形
    const splitData = (earningsProps: EarningType[]) => {
      const categoryData: Date[] = [];

      const epsgrowth: Array<number | string> = [];
      const revenueGrowth: Array<number | string> = [];
      const operatingCashFlowGrowth: Array<number | string> = [];

      earningsProps.forEach((earning) => {
        categoryData.unshift(earning.endOfQuarter);

        epsgrowth.unshift(
          earning.epsgrowth ? Math.round(earning.epsgrowth * 1000) / 10 : '-',
        );
        revenueGrowth.unshift(
          earning.revenueGrowth
            ? Math.round(earning.revenueGrowth * 1000) / 10
            : '-',
        );

        operatingCashFlowGrowth.unshift(
          earning.operatingCashFlowGrowth
            ? Math.round(earning.operatingCashFlowGrowth * 1000) / 10
            : '-',
        );
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
        start,
        end,
        span,

        epsgrowth,
        revenueGrowth,
        operatingCashFlowGrowth,
      };
    };

    const data0 = splitData(earnings);

    const myChart = echarts.init(divRef.current);

    const testDate = data0.categoryData[7];
    console.log('testDate', testDate);

    myChart.setOption({
      legend: [
        {
          top: 35,
          right: 'center',
          data: ['EPS成長率', '売上高成長率', '営業CF成長率'],
          textStyle: {
            color: colors.text,
          },
        },
      ],
      title: [
        {
          text: '成長率',
          left: 0,
          textStyle: {
            color: colors.text,
          },
        },
      ],

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
          formatter: (param: { title: string }) => `<div>${param.title}</div>`,
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

      xAxis: [
        {
          type: 'category',
          scale: true,
          offset: 10,
          data: data0.categoryData,
          // axisLine: {
          //   onZero: false,
          //   lineStyle: { color: colors.chart.borderColor },
          // },
          splitLine: {
            show: true,
            lineStyle: { color: colors.chart.borderColor },
          },

          min: 'dataMin',
          max: 'dataMax',
        },
      ],
      grid: [
        {
          left: '6%',
          right: '4%',
          height: '55%',
        },
      ],

      yAxis: [
        {
          scale: true,
          axisLabel: {
            inside: true,
            padding: [2, 0, 0, 0],
            formatter: '{value} %',
            verticalAlign: 'top',
          },
          axisLine: {
            show: true,
            lineStyle: { color: colors.chart.borderColor },
          },
          splitLine: {
            show: true,
            lineStyle: { color: colors.chart.borderColor },
          },
          splitArea: {
            show: true,
            areaStyle: {
              color: ['none', 'none'],
            },
          },

          min: -50,
          max: 100,
        },
      ],
      dataZoom: [
        {
          type: 'inside',
          xAxisIndex: [0],
          rangeMode: ['value', 'value'],
          startValue: data0.start,
          endValue: data0.end,
        },
        {
          // 横軸のズームスライダー
          show: true,
          xAxisIndex: [0],
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
          name: 'EPS成長率',
          data: data0.epsgrowth,
          type: 'line',
          symbol: 'triangle',
          symbolSize: 3,
          showAllSymbol: 'true',
          lineStyle: {
            color: colors.chart.upBorderColor,
            width: 1,
            type: 'dashed',
          },
          itemStyle: {
            borderWidth: 1,
            borderColor: colors.chart.upBorderColor,
            color: colors.chart.upColor,
          },
        },
        {
          name: '売上高成長率',
          data: data0.revenueGrowth,
          type: 'line',
          symbol: 'circle',
          symbolSize: 3,
          showAllSymbol: 'true',
          lineStyle: {
            color: colors.chart.downBorderColor,
            width: 1,
            type: 'solid',
          },
          itemStyle: {
            borderWidth: 1,
            borderColor: colors.chart.downBorderColor,
            color: colors.chart.downColor,
          },
        },

        {
          name: '営業CF成長率',
          data: data0.operatingCashFlowGrowth,
          type: 'line',
          symbol: 'triangle',
          symbolSize: 3,
          showAllSymbol: 'true',
          lineStyle: {
            color: colors.text,
            width: 1,
            type: 'dashed',
          },
          itemStyle: {
            borderWidth: 1,
            borderColor: colors.text,
            color: colors.text,
          },
        },
      ],
      stateAnimation: {
        duration: 2000,
        easing: 'linear',
      },
    });
  }, [colors, earnings, period]);

  return (
    <>
      <div ref={divRef} style={{ width: '100%', height: '300px' }} />
    </>
  );
};

export default GrowthCharts;

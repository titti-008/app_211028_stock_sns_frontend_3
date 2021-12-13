/* eslint-disable */
import { FC, useRef, useEffect } from 'react';
import { useTheme } from '@mui/material';
import * as echarts from 'echarts';
import { useColors } from '../../hooks/util';
import { EarningType } from '../Types';

type PropsType = {
  earnings: EarningType[];
};
const EpsCharts: FC<PropsType> = ({ earnings }) => {
  const colors = useColors();
  type EChartsOption = echarts.EChartsOption;
  const divRef = useRef<HTMLDivElement>(null!);

  useEffect(() => {
    const { upColor, upBorderColor, downColor, downBorderColor, borderColor } =
      colors.chart;

    // データの整形
    const splitData = (earnings: EarningType[]) => {
      const categoryData: Date[] = [];
      const EstimatesEps: Array<number | string> = [];
      const ReportedEps: Array<number | string> = [];
      const EstimateRevenue: Array<number | string> = [];
      const ReportedRevenue: Array<number | string> = [];

      earnings.forEach((earning) => {
        categoryData.unshift(earning.date);
        EstimatesEps.unshift(Math.round(earning.epsEstimated * 1000) / 1000);
        ReportedEps.unshift(Math.round(earning.eps * 1000) / 1000);
        EstimateRevenue.unshift(Math.round(earning.revenueEstimated));
        ReportedRevenue.unshift(Math.round(earning.revenue));
      });

      return {
        categoryData,
        EstimatesEps,
        ReportedEps,
        EstimateRevenue,
        ReportedRevenue,
      };
    };

    const data0 = splitData(earnings);

    const myChart = echarts.init(divRef.current);

    myChart.setOption({
      legend: {
        top: 35,
        left: 'center',
        data: ['予想EPS', '結果EPS', '売上高-予想', '売上高-結果'],
        textStyle: {
          color: colors.text,
        },
      },
      title: [
        {
          text: 'EPS 予想vs結果',
          left: 0,
          textStyle: {
            color: colors.text,
          },
        },
        {
          text: 'EPS 予想vs結果',
          left: 0,
          textStyle: {
            color: colors.text,
          },
        },
      ],
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
      xAxis: [
        {
          type: 'category',
          scale: true,
          data: data0.categoryData,
          axisLine: {
            onZero: false,
            lineStyle: { color: borderColor },
          },
          splitLine: {
            show: true,
            lineStyle: { color: borderColor },
          },
        },
        {
          type: 'category',
          scale: true,
          data: data0.categoryData,
          gridIndex: 1,
          axisLine: {
            onZero: false,
            lineStyle: { color: borderColor },
          },
          splitLine: {
            show: true,
            lineStyle: { color: borderColor },
          },
          axisLabel: { show: false },
        },
      ],
      grid: [
        {
          left: '6%',
          right: '3%',
          height: '35%',
        },
        {
          left: '6%',
          right: '3%',
          top: '48%',
          height: '35%',
        },
      ],

      yAxis: [
        {
          scale: true,
          axisLabel: {
            inside: true,
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
          axisLabel: {
            inside: true,
          },
          gridIndex: 1,
          splitNumber: 2,
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
      ],
      dataZoom: [
        {
          type: 'inside',
          xAxisIndex: [0, 1],
          rangeMode: ['value', 'value'],
          // startValue: data0.categoryData.length -,
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
          name: '予想EPS',
          data: data0.EstimatesEps,
          type: 'line',
          symbol: 'triangle',
          symbolSize: 3,
          showAllSymbol: 'true',
          lineStyle: {
            color: colors.chart.upBorderColor,
            width: 2,
            type: 'dashed',
          },
          itemStyle: {
            borderWidth: 2,
            borderColor: colors.chart.upBorderColor,
            color: colors.chart.upColor,
          },
        },
        {
          name: '結果EPS',
          data: data0.ReportedEps,
          type: 'line',
          symbol: 'circle',
          symbolSize: 3,
          showAllSymbol: 'true',
          lineStyle: {
            color: colors.chart.downBorderColor,
            width: 2,
            type: 'solid',
          },
          itemStyle: {
            borderWidth: 2,
            borderColor: colors.chart.downBorderColor,
            color: colors.chart.downColor,
          },
        },

        {
          name: '売上高-予想',
          data: data0.EstimateRevenue,
          type: 'line',
          xAxisIndex: 1,
          yAxisIndex: 1,
          symbol: 'triangle',
          symbolSize: 3,
          showAllSymbol: 'true',
          lineStyle: {
            color: colors.chart.upBorderColor,
            width: 2,
            type: 'dashed',
          },
          itemStyle: {
            borderWidth: 2,
            borderColor: colors.chart.upBorderColor,
            color: colors.chart.upColor,
          },
        },
        {
          name: '売上高-結果',
          data: data0.ReportedRevenue,
          type: 'line',
          xAxisIndex: 1,
          yAxisIndex: 1,
          symbol: 'circle',
          symbolSize: 3,
          showAllSymbol: 'true',
          lineStyle: {
            color: colors.chart.downBorderColor,
            width: 2,
            type: 'solid',
          },
          itemStyle: {
            borderWidth: 2,
            borderColor: colors.chart.downBorderColor,
            color: colors.chart.downColor,
          },
        },
      ],
    });
  }, [colors]);

  return (
    <>
      <div ref={divRef} style={{ width: '100%', height: '700px' }} />
    </>
  );
};

export default EpsCharts;

import { FC, useRef, useEffect } from 'react';
import { addYears } from 'date-fns';
import * as echarts from 'echarts';
import { useColors } from '../../hooks/useColors';
import { EarningType } from '../Types';

type PropsType = {
  earnings: EarningType[];
  period: number[];
};
const EpsCharts: FC<PropsType> = ({ earnings, period }) => {
  const colors = useColors();
  const divRef = useRef<HTMLDivElement>(null!);

  useEffect(() => {
    // データの整形
    const splitData = (earningsProps: EarningType[]) => {
      const categoryData: Date[] = [];

      const epsEstimates: Array<number | string> = [];
      const epsReported: Array<number | string> = [];
      const epsDifference: Array<number | string> = [];

      const RevenueEstimate: Array<number | string> = [];
      const RevenueReported: Array<number | string> = [];
      const RevenueDifference: Array<number | string> = [];

      earningsProps.forEach((earning) => {
        categoryData.unshift(earning.endOfQuarter);

        epsEstimates.unshift(
          earning.epsEstimated
            ? Math.round(earning.epsEstimated * 1000) / 1000
            : '-',
        );
        epsReported.unshift(
          earning.eps ? Math.round(earning.eps * 1000) / 1000 : '-',
        );
        epsDifference.unshift(
          earning.epsEstimated || earning.eps
            ? Math.round((earning.eps - earning.epsEstimated) * 1000) / 1000
            : 0,
        );

        RevenueEstimate.unshift(
          earning.revenueEstimated
            ? Math.round(earning.revenueEstimated / 1_000_000)
            : '-',
        );
        RevenueReported.unshift(
          earning.revenue ? Math.round(earning.revenue / 1_000_000) : '-',
        );

        RevenueDifference.unshift(
          earning.revenueEstimated || earning.revenue
            ? Math.round(
                ((earning.revenue - earning.revenueEstimated) /
                  earning.revenueEstimated) *
                  10_000,
              ) / 100 // パーセンテージに変換
            : 0,
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

        epsEstimates,
        epsReported,
        epsDifference,

        RevenueEstimate,
        RevenueReported,
        RevenueDifference,
      };
    };

    const data0 = splitData(earnings);

    const myChart = echarts.init(divRef.current);

    myChart.setOption({
      legend: [
        {
          top: 35,
          right: 'center',
          data: ['予想EPS', '結果EPS', 'EPS差異'],
          textStyle: {
            color: colors.text,
          },
        },
        {
          top: '48%',
          right: 'center',
          data: ['売上高-予想', '売上高-結果', '売上高差異(%)'],
          textStyle: {
            color: colors.text,
          },
        },
      ],
      title: [
        {
          text: 'EPS 予想vs結果',
          left: 0,
          textStyle: {
            color: colors.text,
          },
        },
        {
          text: '売上高 予想vs結果',
          left: 0,
          top: '44%',
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
          // EPS X軸
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
        {
          // 売上高 X軸
          type: 'category',
          scale: true,
          data: data0.categoryData,
          gridIndex: 1,
          axisLine: {
            onZero: false,
            lineStyle: { color: colors.chart.borderColor },
          },
          splitLine: {
            show: true,
            lineStyle: { color: colors.chart.borderColor },
          },
          axisLabel: { show: false },

          min: 'dataMin',
          max: 'dataMax',
        },
        {
          // EPS差異 X軸
          type: 'category',
          gridIndex: 0,
          data: data0.categoryData,
          scale: true,
          axisLine: { onZero: false },
          axisTick: { show: false },
          splitLine: { show: false },
          axisLabel: { show: false },
          min: 'dataMin',
          max: 'dataMax',
        },

        {
          // 売上高差異 X軸
          type: 'category',
          gridIndex: 1,
          data: data0.categoryData,
          scale: true,
          axisLine: { onZero: false },
          axisTick: { show: false },
          splitLine: { show: false },
          axisLabel: { show: false },
          min: 'dataMin',
          max: 'dataMax',
        },
      ],
      grid: [
        {
          left: '6%',
          right: '4%',
          height: '30%',
        },
        {
          left: '6%',
          right: '4%',
          top: '51%',
          height: '30%',
        },

        // ////
      ],

      yAxis: [
        {
          // EPS Y軸
          scale: true,
          axisLabel: {
            inside: true,
            padding: [2, 0, 0, 0],
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
        },
        {
          // 売上高 Y軸
          scale: true,
          axisLabel: {
            inside: true,
            padding: [2, 0, 0, 0],
            formatter: '{value} M',
            verticalAlign: 'top',
          },
          gridIndex: 1,
          splitNumber: 2,
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
        },
        {
          // EPS差異 Y軸
          scale: true,
          gridIndex: 0,
          axisLabel: {
            show: false,
            formatter: '{value} M',
          },
          axisLine: { show: false },
          axisTick: { show: false },
          splitLine: { show: false },
        },
        {
          // 売上高差異% Y軸
          scale: true,
          gridIndex: 1,
          axisLabel: {
            show: false,
            formatter: '{value} %',
          },
          axisLine: { show: false },
          axisTick: { show: false },
          splitLine: { show: false },
          min: -50,
          max: 50,
        },
      ],
      dataZoom: [
        {
          type: 'inside',
          xAxisIndex: [0, 1, 2, 3],
          rangeMode: ['value', 'value'],
          startValue: data0.start,
          endValue: data0.end,
        },
        {
          // 横軸のズームスライダー
          show: true,
          xAxisIndex: [0, 1, 2, 3],
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
          name: '予想EPS',
          data: data0.epsEstimates,
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
          name: '結果EPS',
          data: data0.epsReported,
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
          name: '売上高-予想',
          data: data0.RevenueEstimate,
          type: 'line',
          xAxisIndex: 1,
          yAxisIndex: 1,
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
          name: '売上高-結果',
          data: data0.RevenueReported,
          type: 'line',
          xAxisIndex: 1,
          yAxisIndex: 1,
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
          name: 'EPS差異',
          type: 'bar',
          xAxisIndex: 2,
          yAxisIndex: 2,
          data: data0.epsDifference,
          itemStyle: {
            color: colors.chart.borderColor,
            opacity: 0.4,
          },
        },
        {
          name: '売上高差異(%)',
          type: 'bar',
          xAxisIndex: 3,
          yAxisIndex: 3,
          data: data0.RevenueDifference,
          itemStyle: {
            color: colors.chart.borderColor,
            opacity: 0.4,
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
      <div ref={divRef} style={{ width: '100%', height: '700px' }} />
    </>
  );
};

export default EpsCharts;
/* eslint-disable */

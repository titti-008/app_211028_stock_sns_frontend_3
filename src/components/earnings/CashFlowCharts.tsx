import { FC, useRef, useEffect } from 'react';
import { addYears } from 'date-fns';
import * as echarts from 'echarts';
import { useColors } from '../../hooks/useColors';
import { EarningType } from '../Types';

type PropsType = {
  earnings: EarningType[];
  period: number[];
};
const CashFlowCharts: FC<PropsType> = ({ earnings, period }) => {
  const colors = useColors();
  const divRef = useRef<HTMLDivElement>(null!);

  useEffect(() => {
    // データの整形
    const splitData = (earningsProps: EarningType[]) => {
      const categoryData: Date[] = [];

      const netIncome: Array<number | string> = [];
      const operatingCashFlow: Array<number | string> = [];
      const difference: Array<number | string> = [];
      const cashFlowMargin: Array<number | string> = [];

      earningsProps.forEach((earning) => {
        categoryData.unshift(earning.endOfQuarter);

        netIncome.unshift(
          earning.netIncome ? Math.round(earning.netIncome / 1_000_000) : '-',
        );
        operatingCashFlow.unshift(
          earning.operatingCashFlow
            ? Math.round(earning.operatingCashFlow / 1_000_000)
            : '-',
        );

        difference.unshift(
          earning.netIncome || earning.operatingCashFlow
            ? Math.round(
                (earning.operatingCashFlow - earning.netIncome) / 1_000_000,
              )
            : '-',
        );

        cashFlowMargin.unshift(
          earning.revenue && earning.operatingCashFlow
            ? Math.round((earning.operatingCashFlow / earning.revenue) * 1000) /
                10
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

        netIncome,
        operatingCashFlow,
        difference,
        cashFlowMargin,
      };
    };

    const data0 = splitData(earnings);

    const myChart = echarts.init(divRef.current);

    myChart.setOption({
      legend: [
        {
          top: 35,
          right: 'center',
          data: [
            '①純利益',
            '②営業キャッシュフロー',
            '②-① 差異',
            '③キャッシュフローマージン',
          ],
          textStyle: {
            color: colors.text,
          },
        },
      ],
      title: [
        {
          text: '営業キャッシュフロー',
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
          // 売上高 X軸
          type: 'category',
          scale: true,
          data: data0.categoryData,
          gridIndex: 0,
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
          axisTick: { show: true },
          splitLine: { show: false },
          axisLabel: { show: false },
          min: 'dataMin',
          max: 'dataMax',
        },

        {
          // CFマージン X軸
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
          height: '40%',
        },
        {
          left: '6%',
          right: '4%',
          top: '63%',
          height: '20%',
        },
      ],

      yAxis: [
        {
          // netIncome & CF Y軸
          scale: true,
          axisLabel: {
            inside: true,
            padding: [2, 0, 0, 0],
            verticalAlign: 'top',
            formatter: '{value} M',
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
          // 差異 Y軸
          scale: true,
          axisLabel: {
            show: false,
          },
          axisLine: { show: false },
          axisTick: { show: false },
          splitLine: { show: false },
        },
        {
          // CFマージン Y軸
          scale: true,
          gridIndex: 1,
          min: -10,
          max: 50,
          axisLabel: {
            inside: true,
            right: 0,
            padding: [2, 0, 0, 0],
            verticalAlign: 'top',
            formatter: '{value} %',
          },
          axisLine: {
            show: true,
            lineStyle: { color: colors.text },
          },
          splitLine: {
            show: false,
            lineStyle: { color: colors.text },
          },
          splitArea: {
            show: false,
            areaStyle: {
              color: ['none', 'none'],
            },
          },
        },
      ],
      dataZoom: [
        {
          type: 'inside',
          xAxisIndex: [0, 1, 2],
          rangeMode: ['value', 'value'],
          startValue: data0.start,
          endValue: data0.end,
        },
        {
          // 横軸のズームスライダー
          show: true,
          xAxisIndex: [0, 1, 2],
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
          name: '①純利益',
          data: data0.netIncome,
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
          name: '②営業キャッシュフロー',
          data: data0.operatingCashFlow,
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
          name: '②-① 差異',
          type: 'bar',
          xAxisIndex: 1,
          yAxisIndex: 1,
          data: data0.difference,
          itemStyle: {
            color: colors.chart.borderColor,
            opacity: 0.4,
          },
        },

        {
          name: '③キャッシュフローマージン',
          data: data0.cashFlowMargin,
          type: 'bar',
          xAxisIndex: 2,
          yAxisIndex: 2,
          symbol: 'circle',
          symbolSize: 3,
          showAllSymbol: 'true',
          lineStyle: {
            color: colors.text,
            width: 1,
            type: 'solid',
          },
          itemStyle: {
            borderWidth: 1,
            borderColor: colors.chart.borderColor,
            color: colors.chart.borderColor,
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
      <div ref={divRef} style={{ width: '100%', height: '400px' }} />
    </>
  );
};

export default CashFlowCharts;

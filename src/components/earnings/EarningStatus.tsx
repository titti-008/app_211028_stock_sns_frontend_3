import { FC, useLayoutEffect } from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themesMaterial from '@amcharts/amcharts4/themes/material';
// import am4themesAnimated from '@amcharts/amcharts4/themes/animated';
import { Stock, EarningType } from '../Types';
import IconText from '../privateMUI/IconText';
import // LinkButton,
// TextButton,
// SubmitButton,
'../privateMUI/PrivateBottuns';
import { NormalText } from '../privateMUI/PrivateTexts';
// import { useAppContext } from '../../hooks/ReduserContext';

am4core.useTheme(am4themesMaterial);

type PropsType = {
  stock: Stock;
  earning: EarningType;
  lastYearEarning: EarningType;
};

const EarningStatus: FC<PropsType> = ({ stock, earning, lastYearEarning }) => {
  // const { state } = useAppContext();
  // const { currentUser } = state;

  // const symbol = match.params.symbolA

  // const chart = useRef<am4charts.RadarChart>(null!);

  // 営業キャッシュフローマージン
  const operatingCashflowMargin =
    Math.round((earning.operatingCashflow / earning.totalRevenue) * 1000) / 10;

  // 信頼性(粉飾決算リスクの低さ)
  const notWindowdressing =
    Math.round(
      ((earning.operatingCashflow - earning.netIncome) /
        earning.operatingCashflow) *
        1000,
    ) / 10;

  // EPS サプライズ
  const EpsSurprise = Math.round(earning.surprisePercentage * 10) / 10;

  // 営業キャッシュフローの伸び率
  const operatingCashflowGrowth = lastYearEarning?.operatingCashflow
    ? Math.round(
        (earning.operatingCashflow / lastYearEarning.operatingCashflow - 1) *
          1000,
      ) / 10
    : 100;

  const nextEpsEstimateVsGuidance =
    Math.round((0 / earning.estimatedEPS) * 1000) / 10;

  console.log(stock);

  useLayoutEffect(() => {
    const chart = am4core.create(
      `chartdiv-${earning.id}`,
      am4charts.RadarChart,
    );
    chart.colors.list = [
      am4core.color('#D65DB1'),
      am4core.color('#FF6F91'),
      am4core.color('#FF9671'),
      am4core.color('#FFC75F'),
      am4core.color('#F9F871'),
    ];

    chart.data = [
      {
        earning: '営業キャッシュフローマージン',
        Percentage: operatingCashflowMargin,
        config: {
          stroke: '#F00',
        },
      },
      {
        earning: '決算の信頼性',
        Percentage: notWindowdressing,
      },
      {
        earning: 'EPSサプライズ',
        Percentage: EpsSurprise,
      },
      {
        earning: '営業キャッシュフローの伸び率',
        Percentage: operatingCashflowGrowth,
      },
      {
        earning: '来期ガイダンスvs予想',
        Percentage: nextEpsEstimateVsGuidance,
      },
    ];
    chart.start = 0;
    chart.end = 100;

    const pattern = new am4core.LinePattern();
    pattern.stroke = am4core.color('red');

    const categoryAxis = chart.xAxes.push(
      new am4charts.CategoryAxis<am4charts.AxisRendererCircular>(),
    );
    categoryAxis.dataFields.category = 'earning';
    // categoryAxis

    const valueAxis = chart.yAxes.push(
      new am4charts.ValueAxis<am4charts.AxisRendererRadial>(),
    );

    const series = chart.series.push(new am4charts.RadarSeries());
    series.name = 'Sales';
    series.dataFields.valueY = 'Percentage';
    series.dataFields.categoryX = 'earning';
    series.strokeWidth = 3;

    chart.textDecoration = 'underline';

    if (valueAxis.tooltip !== undefined) {
      valueAxis.tooltip.disabled = true;
      valueAxis.renderer.minWidth = 35;
    }

    // return () => {
    //   chart.dispose();
    // };
  }, [
    EpsSurprise,
    nextEpsEstimateVsGuidance,
    notWindowdressing,
    operatingCashflowGrowth,
    operatingCashflowMargin,
    earning,
  ]);

  return (
    <>
      <IconText
        linkTo={`/stocks/${earning.symbol}`}
        key={earning.id}
        name={earning.symbol}
        date={new Date(earning.reportedDate)}
      >
        <div
          id={`chartdiv-${earning.id}`}
          style={{ width: '100%', height: '350px' }}
        />
        {/* <NormalText>CompanyName:{stock.name}</NormalText> */}
        {earning?.operatingCashflow && (
          <>
            <NormalText>
              営業キャッシュフロー:
              {earning.operatingCashflow.toLocaleString()}
              {earning.reportedCurrency}
            </NormalText>
            <NormalText>
              売上高:
              {earning.totalRevenue.toLocaleString()}
              {earning.reportedCurrency}
            </NormalText>
            <NormalText>
              営業キャッシュフローマージン:
              {operatingCashflowMargin}%
            </NormalText>
            <NormalText>
              決算の信頼性:
              {notWindowdressing}%
            </NormalText>
            <NormalText>EPS Suprise:{EpsSurprise}%</NormalText>
          </>
        )}
        <NormalText>estimatedEPS:{earning.estimatedEPS}</NormalText>
        {lastYearEarning?.operatingCashflow && earning?.operatingCashflow && (
          <>
            <NormalText>
              営業キャッシュフローの伸び率:{operatingCashflowGrowth}%
            </NormalText>
            <NormalText>今回:{earning.fiscalDateEnding}</NormalText>
            <NormalText>前年:{lastYearEarning.fiscalDateEnding}</NormalText>
          </>
        )}
        <NormalText>
          来期ガイダンスvs予想:{nextEpsEstimateVsGuidance}%
        </NormalText>
      </IconText>
    </>
  );
};

export default EarningStatus;

/* eslint-disable */

/* eslint-disable */

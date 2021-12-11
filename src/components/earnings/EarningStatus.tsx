import { FC, useLayoutEffect } from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themesMaterial from '@amcharts/amcharts4/themes/material';

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
};

const EarningStatus: FC<PropsType> = ({ stock, earning }) => {
  // const { state } = useAppContext();
  // const { currentUser } = state;

  // 営業キャッシュフローマージン
  const operatingCashflowMargin =
    Math.round((earning.operatingCashFlow / earning.revenue) * 1000) / 10;

  // 信頼性(粉飾決算リスクの低さ)
  const notWindowdressing =
    Math.round(
      ((earning.operatingCashFlow - earning.netIncome) /
        earning.operatingCashFlow) *
        1000,
    ) / 10;

  // EPS サプライズ
  const revenueSurprise =
    Math.round((earning.revenue / earning.estimatedRevenueAvg - 1) * 1000) / 10;

  // Revenue サプライズ
  const epsSurprise =
    Math.round((earning.eps / earning.estimatedEpsAvg - 1) * 1000) / 10;

  // 営業キャッシュフローの伸び率
  const operatingCashflowGrowth =
    Math.round(earning.operatingCashFlowGrowth * 1000) / 10;

  const signCheck = (value: number) =>
    Math.sign(value) >= 0 ? `+${value}` : value;

  // 次期アナリスト予想と会社の見通し
  const nextRevenueEstimateVsGuidance =
    Math.round(
      (earning.estimatedRevenueAvg / earning.estimatedRevenueAvg - 1) * 1000,
    ) / 10;

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
        earning: '信頼性',
        Percentage: notWindowdressing,
      },
      {
        earning: 'EPSサプライズ',
        Percentage: epsSurprise,
      },
      {
        earning: 'Revenue サプライズ',
        Percentage: revenueSurprise,
      },
      {
        earning: '営業キャッシュフローの伸び率',
        Percentage: operatingCashflowGrowth,
      },
      {
        earning: 'ガイダンスvs予想',
        Percentage: nextRevenueEstimateVsGuidance,
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
    epsSurprise,
    nextRevenueEstimateVsGuidance,
    notWindowdressing,
    operatingCashflowGrowth,
    operatingCashflowMargin,
    revenueSurprise,
    earning,
  ]);

  return (
    <>
      <IconText
        linkTo={`/stocks/${earning.symbol}`}
        key={earning.id}
        name={`${earning.symbol}(${stock.name})`}
        date={new Date(earning.date)}
        distanceToNow={false}
      >
        <div
          id={`chartdiv-${earning.id}`}
          style={{ width: '400px', height: '300px' }}
        />
        {/* <NormalText>CompanyName:{stock.name}</NormalText> */}
        {earning?.operatingCashFlow && (
          <>
            <NormalText>
              営業キャッシュフロー:
              {earning.operatingCashFlow}
              {earning.reportedCurrency}
            </NormalText>

            <NormalText>
              売上高:
              {earning.revenue}
              {earning.reportedCurrency}
            </NormalText>
            <NormalText>
              営業キャッシュフローマージン:
              {signCheck(operatingCashflowMargin)}%
            </NormalText>
            <NormalText>
              信頼性:
              {notWindowdressing}%
            </NormalText>
            <NormalText>EPS Suprise:{signCheck(epsSurprise)}%</NormalText>
          </>
        )}
        <NormalText>estimatedEPS:{earning.eps}</NormalText>
        {earning?.operatingCashFlow && (
          <>
            <NormalText>
              営業キャッシュフローの伸び率:
              {}
              {signCheck(operatingCashflowGrowth)}%
            </NormalText>
          </>
        )}
        <NormalText>
          ガイダンスvs予想:{signCheck(nextRevenueEstimateVsGuidance)}%
        </NormalText>
      </IconText>
    </>
  );
};

export default EarningStatus;

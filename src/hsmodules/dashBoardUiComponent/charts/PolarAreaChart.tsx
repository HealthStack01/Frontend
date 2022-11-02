import React from "react";
import Chart from "react-apexcharts";
import { polaChartSeries } from "../utils/mock_chart_data";
import ChartCard from "./ChartCard";
interface PolarAreaChartProps {
  title?: string;
  series?: { data: any[]; labels: any[] };
}

const PolarAreaChart: React.FC<PolarAreaChartProps> = ({
  title,
  series = polaChartSeries,
}) => {
  const state = {
    series: series.data,
    options: {
      chart: {
        toolbar: { show: false },
        zoom: { enabled: false },
      },
      grid: { show: false },
      plotOptions: {
        radialBar: {
          hollow: {
            size: "70%",
          },
        },
      },
      labels: series.labels,
    },
  };
  return (
    <ChartCard>
      <Chart
        options={state.options}
        series={state.series}
        type="polarArea"
        height={350}
        width={340}
      />
    </ChartCard>
  );
};

export default PolarAreaChart;

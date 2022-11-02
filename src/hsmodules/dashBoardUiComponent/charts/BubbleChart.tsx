import React from "react";
import ReactApexChart from "react-apexcharts";
import { bubbleSeries } from "../utils/mock_chart_data";
import ChartCard from "./ChartCard";
interface BubbleChartProps {
  title?: string;
  series?: { name: string; data: [] }[];
}

const BubbleChart: React.FC<BubbleChartProps> = ({
  title,
  series = bubbleSeries,
}) => {
  const state = {
    series: series,
    options: {
      chart: {
        toolbar: { show: false },
        zoom: { enabled: false },
      },
      grid: { show: false },
      dataLabels: {
        enabled: false,
      },
    },
  };
  return (
    <ChartCard title={title}>
      <ReactApexChart
        options={state.options}
        series={state.series}
        type="bubble"
        height={350}
        width="100%"
      />
    </ChartCard>
  );
};

export default BubbleChart;

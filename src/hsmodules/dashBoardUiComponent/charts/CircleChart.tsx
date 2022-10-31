import React from "react";
import ReactApexChart from "react-apexcharts";
import { circleSeries } from "../utils/mock_chart_data";
import ChartCard from "./ChartCard";

interface CircleChartProps {
  title?: string;
  series?: any[];
  labels?: any[];
}

const CircleChart: React.FC<CircleChartProps> = ({
  title,
  series = circleSeries,
  labels,
}) => {
  const state = {
    series: series,
    options: {
      chart: {
        toolbar: { show: false },
        zoom: { enabled: false },
      },
      grid: { show: false },
      series: series,
      labels: labels,
      plotOptions: {
        pie: {
          donut: {
            show: true,
            labels: {
              show: true,
              total: {
                show: true,
              },
            },
          },
        },
      },
      title: {
        text: title ? title : "",
      },
    },
  };
  return (
    <ChartCard title={title}>
      <ReactApexChart
        options={state.options}
        series={state.series}
        type="donut"
        height={450}
        width={250}
      />
    </ChartCard>
  );
};

export default CircleChart;

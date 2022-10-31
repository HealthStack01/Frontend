import Chart from "react-apexcharts";
import React from "react";
import ChartCard from "./ChartCard";
import { chartoptions } from "../utils/chartoptions";
import { lineSeries } from "../utils/mock_chart_data";

interface LineChartProps {
  title: string;
  monthArray?: string[];
  subheader?: string;
  series?: { name: string; data: [] }[] | any;
}

const LineChart: React.FC<LineChartProps> = ({
  title,
  subheader = "Sample Line Chart",
  series = lineSeries,
  monthArray,
}) => {
  const state = {
    series: series,
    options: {
      ...chartoptions,

      xaxis: {
        axisBorder: { show: false },
        axisTicks: { show: false },
        title: {
          text: title ? title : "",
        },
        categories: monthArray,
      },
    },
  };
  return (
    <ChartCard>
      <Chart
        options={state.options}
        series={state.series}
        type="line"
        height={250}
        width="100%"
      />
    </ChartCard>
  );
};

export default LineChart;

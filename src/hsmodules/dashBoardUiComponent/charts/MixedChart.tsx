import React from "react";
import Chart from "react-apexcharts";
import { mixedSeries } from "../utils/mock_chart_data";
import ChartCard from "./ChartCard";

interface MixedChartProps {
  title?: string;
  series?: { name: string; data: [] }[];
}

const MixedChart: React.FC<MixedChartProps> = ({
  title,
  series = mixedSeries,
}) => {
  const state = {
    series: series,
    options: {
      chart: {
        toolbar: { show: false },
        zoom: { enabled: false },
        curve: "smooth",
      },
      // States
      states: {
        hover: {
          filter: {
            type: "lighten",
            value: 0.04,
          },
        },
        active: {
          filter: {
            type: "darken",
            value: 0.88,
          },
        },
      },
      // Fill
      fill: {
        opacity: [0.85, 0.25, 1],
        gradient: {
          inverseColors: false,
          shade: "light",
          type: "vertical",
          opacityFrom: 0.85,
          opacityTo: 0.55,
          stops: [0, 100, 100, 100],
        },
      },

      // Datalabels
      dataLabels: { enabled: false },
      // Grid
      grid: {
        show: false,
      },
      // Xaxis
      xaxis: {
        axisBorder: { show: false },
        axisTicks: { show: false },
      },
      // Markers
      markers: {
        size: 0,
        strokeColors: "white",
      },
      // Tooltip
      tooltip: {
        x: {
          show: false,
        },
        y: {
          formatter: function (y: number) {
            if (typeof y !== "undefined") {
              return y.toFixed(0) + " points";
            }
            return y;
          },
        },
      }, // plotOptions
      plotOptions: {
        // Bar
        bar: {
          columnWidth: "100%",
          rowWidth: "100%",
          borderRadius: 4,
        },
      },
      //   curve
    },
  };
  return (
    <ChartCard title={title}>
      <Chart
        options={state.options}
        series={state.series}
        type="line"
        height={500}
        width="100%"
      />
    </ChartCard>
  );
};

export default MixedChart;

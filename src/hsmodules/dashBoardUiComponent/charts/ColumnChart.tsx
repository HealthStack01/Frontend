import ReactApexChart from "react-apexcharts";
import { chartoptions } from "../utils/chartoptions";
import { columnSeries } from "../utils/mock_chart_data";
import ChartCard from "./ChartCard";

interface ColumnChartProps {
  title?: string;
  series?: { name: string; data: [] }[] | any;
  xLabels: [] | any;
}

const ColumnChart: React.FC<ColumnChartProps> = ({
  title,
  series = columnSeries,
  xLabels,
}) => {
  const state = {
    options: {
      ...chartoptions,
      xaxis: {
        categories: xLabels ? xLabels : [],
        title: {
          text: title ? title : "",
        },
      },
    },
    series: series,
  };
  return (
    <ChartCard title={title}>
      <ReactApexChart
        options={state.options}
        series={state.series}
        type="bar"
        height={250}
        width="100%"
      />
    </ChartCard>
  );
};

export default ColumnChart;

import React from "react";
import Box from "@mui/material/Box";
import { ResponsiveChartContainer } from "@mui/x-charts/ResponsiveChartContainer";
import { ChartsTooltip } from "@mui/x-charts/ChartsTooltip";
import { LinePlot } from "@mui/x-charts/LineChart";
import { BarPlot } from "@mui/x-charts/BarChart";
import { ChartsXAxis } from "@mui/x-charts/ChartsXAxis";
import { ChartsYAxis } from "@mui/x-charts/ChartsYAxis";
import { ChartsGrid } from "@mui/x-charts/ChartsGrid";
import { axisClasses } from "@mui/x-charts/ChartsAxis";
import {
  AxisWithCompositionProps,
  isSeriesDataType,
  SeriesDataType,
} from "@/types/chart";

const AxisWithComposition = ({
  xAxisData,
  seriesData,
  yAxisIds,
  height = 400,
  margin = { left: 70, right: 70 },
  yAxisInterval,
}: AxisWithCompositionProps) => {
  const getBarMaxValue = (): number | undefined => {
    const barData = seriesData[0];
    if (!isSeriesDataType(barData)) {
      return undefined;
    }
    /// 내림차순 정렬
    return barData.data.sort((a, b) => b - a).at(0);
  };

  const leftAxisInterval = (): any[] | undefined => {
    if (!Array.isArray(yAxisInterval) || yAxisInterval.length == 0) {
      return undefined;
    }

    const barMaxValue = getBarMaxValue();

    if (!barMaxValue) {
      return undefined;
    }

    const axisLength = yAxisInterval.length - 2;
    const midiateVaue = Array(axisLength)
      .fill(0)
      .map(
        (_, index) => (barMaxValue / (yAxisInterval.length - 1)) * (index + 1),
      );

    return [0, ...midiateVaue, barMaxValue];
  };

  return (
    <Box sx={{ width: "100%" }}>
      <ResponsiveChartContainer
        xAxis={[
          {
            scaleType: "band",
            data: xAxisData,
            id: "quarters",
          },
        ]}
        yAxis={yAxisIds}
        series={seriesData}
        height={height}
        margin={margin}
        sx={{
          [`.${axisClasses.left} .${axisClasses.label}`]: {
            transform: "translate(-25px, 0)",
          },
          [`.${axisClasses.right} .${axisClasses.label}`]: {
            transform: "translate(30px, 0)",
          },
        }}
      >
        <ChartsGrid horizontal={true} />
        <BarPlot />
        <LinePlot />
        <ChartsTooltip />
        <ChartsXAxis
          axisId="quarters"
          labelStyle={{
            fontSize: 18,
          }}
        />
        <ChartsYAxis
          axisId={`${yAxisIds[0].id}`}
          disableLine={true}
          disableTicks={true}
          tickInterval={leftAxisInterval()}
        />
        <ChartsYAxis
          axisId={`${yAxisIds.length > 2 ? yAxisIds[2].id : yAxisIds[1].id}`}
          position="right"
          disableLine={true}
          disableTicks={true}
          tickInterval={yAxisInterval}
        />
      </ResponsiveChartContainer>
    </Box>
  );
};

export default AxisWithComposition;
